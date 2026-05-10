'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, collection, addDoc, deleteDoc, onSnapshot, orderBy, query as firestoreQuery, writeBatch, updateDoc } from 'firebase/firestore';
import Link from 'next/link';
import { staticGalleryData, staticStudents, staticMemories } from '../../lib/constants';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const [galleries, setGalleries] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'gallery' | 'siswa' | 'memories'>('gallery');
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [editingMemory, setEditingMemory] = useState<any | null>(null);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = (file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };
  
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        if (u.email === 'aghna1011@gmail.com') {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', u.uid));
            setIsAdmin(adminDoc.exists());
          } catch (e) {
            console.error(e);
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubGal = onSnapshot(firestoreQuery(collection(db, 'gallery'), orderBy('createdAt', 'desc')), (snap) => {
      setGalleries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubSis = onSnapshot(firestoreQuery(collection(db, 'students'), orderBy('absen', 'asc')), (snap) => {
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubMem = onSnapshot(firestoreQuery(collection(db, 'memories'), orderBy('order', 'asc')), (snap) => {
      setMemories(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubGal(); unsubSis(); unsubMem(); }
  }, [isAdmin]);

  const seedGallery = async () => {
    if (!confirm('Impor data gallery awal?')) return;
    try {
      const batch = writeBatch(db);
      staticGalleryData.forEach(item => {
        const newDoc = doc(collection(db, 'gallery'));
        batch.set(newDoc, { ...item, createdAt: Date.now() });
      });
      await batch.commit();
      alert('Data gallery berhasil diimpor!');
    } catch (err) {
      console.error(err);
    }
  };

  const seedStudents = async () => {
    if (!confirm('Impor data warga kelas awal?')) return;
    try {
      const batch = writeBatch(db);
      staticStudents.forEach(item => {
        const newDoc = doc(collection(db, 'students'));
        batch.set(newDoc, item);
      });
      await batch.commit();
      alert('Data warga kelas berhasil diimpor!');
    } catch (err) {
      console.error(err);
    }
  };

  const seedMemories = async () => {
    if (!confirm('Impor data catatan perjalanan awal?')) return;
    try {
      const batch = writeBatch(db);
      staticMemories.forEach(item => {
        const newDoc = doc(collection(db, 'memories'));
        batch.set(newDoc, item);
      });
      await batch.commit();
      alert('Data catatan perjalanan berhasil diimpor!');
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    
    try {
      const timestamp = new Date().getTime();
      // Ensure we have a background image: either a newly uploaded one, a provided one from edit, or fallback to first image in array
      const finalBg = galleryImages[0] || preview || editingGallery?.bg || '';
      
      const newItem = {
        title: fd.get('title') as string,
        category: fd.get('category') as string,
        bg: finalBg,
        images: galleryImages,
        createdAt: editingGallery?.createdAt || timestamp
      };

      if (editingGallery) {
        await updateDoc(doc(db, 'gallery', editingGallery.id), newItem);
        setEditingGallery(null);
      } else {
        await addDoc(collection(db, 'gallery'), newItem);
      }
      
      setPreview(null);
      setGalleryImages([]);
      // Manual reset of form fields since reset() might conflict with controlled state in some setups
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'gallery');
    }
  };

  const [preview, setPreview] = useState<string | null>(null);
  const handleFile = async (file: File) => {
    setIsCompressing(true);
    try {
      // Automatic compression to keep things under ~500kb-800kb while maintaining quality
      const compressedBase64 = await compressImage(file, 1600, 1600, 0.75);
      
      setPreview(compressedBase64);
      setGalleryImages(prev => [...prev, compressedBase64]);
    } catch (err) {
      console.error('Compression error:', err);
      alert('Gagal memproses gambar');
    } finally {
      setIsCompressing(false);
    }
  };

  const deleteDocItem = async (col: string, id: string) => {
    if (!confirm('Apakah kamy yakin ingin menghapus data ini?')) return;
    try {
      await deleteDoc(doc(db, col, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${col}/${id}`);
    }
  };

  const addStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const itemData = {
      absen: fd.get('absen') as string,
      name: fd.get('name') as string,
      role: fd.get('role') as string,
      quote: fd.get('quote') as string,
    };
    try {
      if (editingStudent) {
        await updateDoc(doc(db, 'students', editingStudent.id), itemData);
        setEditingStudent(null);
      } else {
        await addDoc(collection(db, 'students'), itemData);
      }
      e.currentTarget.reset();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'students');
    }
  };

  const addMemory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const itemData = {
      title: fd.get('title') as string,
      date: fd.get('date') as string,
      desc: fd.get('desc') as string,
      rotate: fd.get('rotate') as string,
      bg: fd.get('bg') as string,
      order: Number(fd.get('order')),
    };
    try {
      if (editingMemory) {
        await updateDoc(doc(db, 'memories', editingMemory.id), itemData);
        setEditingMemory(null);
      } else {
        await addDoc(collection(db, 'memories'), itemData);
      }
      e.currentTarget.reset();
      setPreview(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'memories');
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="p-10 text-[#F4EDE0]">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#180808]">
        <div className="bg-[#3A0A0A] p-8 rounded-lg border border-[#C4973A4D] shadow-xl text-center">
          <h1 className="text-2xl font-instrument italic text-[#C4973A] mb-6">Admin Login</h1>
          <button onClick={login} className="px-6 py-2 bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-[#F4EDE0] transition-colors">
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#180808] p-4 text-center">
        <h1 className="text-xl text-[#F4EDE0] mb-4">Kamu tidak memiliki akses Admin.</h1>
        <p className="text-sm text-[#F4EDE0]/70 mb-6">UID Kamu: {user.uid}<br/>(Tambahkan UID ini ke collection &apos;admins&apos; di Firebase Console jika kamu adalah admin)</p>
        <button onClick={() => signOut(auth)} className="px-6 py-2 border border-[#C4973A] text-[#C4973A] rounded hover:bg-[#C4973A] hover:text-black transition-colors">Logout</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#130606] text-[#F4EDE0] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-[#C4973A33]">
          <h1 className="text-3xl font-instrument italic text-[#C4973A] mb-4 md:mb-0">EPSILON Admin Panel</h1>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-sm uppercase tracking-widest text-[#F4EDE0]/70 hover:text-[#C4973A]">Kembali ke Web</Link>
            <button onClick={() => signOut(auth)} className="text-sm uppercase tracking-widest text-[#F4EDE0]/70 hover:text-[#C4973A]">Logout</button>
          </div>
        </div>

        <div className="flex space-x-4 mb-8">
          <button onClick={() => setActiveTab('gallery')} className={`px-4 py-2 font-syne uppercase text-sm ${activeTab === 'gallery' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Gallery</button>
          <button onClick={() => setActiveTab('siswa')} className={`px-4 py-2 font-syne uppercase text-sm ${activeTab === 'siswa' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Warga Kelas</button>
          <button onClick={() => setActiveTab('memories')} className={`px-4 py-2 font-syne uppercase text-sm ${activeTab === 'memories' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Catatan Perjalanan</button>
        </div>

        {activeTab === 'gallery' && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Gallery</h2>
              {galleries.length === 0 && (
                <button onClick={seedGallery} className="text-xs border border-[#C4973A] px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
              )}
            </div>
            <form onSubmit={handleGalleryCreate} className="flex flex-col gap-6 mb-8 bg-[#3A0A0A] p-6 rounded-lg border border-[#C4973A33]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                    className="border-2 border-dashed border-[#C4973A4D] rounded-lg h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#C4973A] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    {isCompressing ? (
                      <div className="flex flex-col items-center animate-pulse">
                        <div className="w-8 h-8 border-2 border-[#C4973A] border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-[10px] font-syne uppercase tracking-widest text-[#C4973A]">Memproses...</span>
                      </div>
                    ) : preview ? (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${preview})` }}></div>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4973A] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span className="text-xs font-syne uppercase tracking-widest text-[#C4973A80]">Drag & Drop High Quality Image</span>
                        <span className="text-[10px] text-[#F4EDE04D] mt-1">Atau klik untuk memilih file</span>
                      </>
                    )}
                    <input id="file-input" type="file" accept="image/*" multiple className="hidden" onChange={(e) => { 
                      const files = e.target.files;
                      if(files) {
                        Array.from(files).forEach(f => handleFile(f));
                      }
                    }} />
                    <input type="hidden" name="bg" value={galleryImages[0] || ''} />
                  </div>
                  {galleryImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                       {galleryImages.map((img, i) => (
                         <div key={i} className="relative w-12 h-12 bg-cover bg-center rounded" style={{ backgroundImage: `url(${img})` }}>
                           <button onClick={(e) => { e.stopPropagation(); setGalleryImages(prev => prev.filter((_, idx) => idx !== i)); }} className="absolute -top-1 -right-1 bg-red-600 text-[8px] p-0.5 rounded-full">×</button>
                         </div>
                       ))}
                       <button type="button" onClick={() => setGalleryImages([])} className="text-[10px] text-red-400 hover:underline">Clear All</button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  <input required name="title" defaultValue={editingGallery?.title || ''} placeholder="Judul Foto (e.g. Momen KBM)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <input required name="category" defaultValue={editingGallery?.category || ''} placeholder="Kategori (e.g. kegiatan, momen, foto-kelas)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <div className="pt-2 flex gap-2">
                    <button type="submit" className="flex-1 bg-[#C4973A] text-black font-bold uppercase tracking-widest py-3 rounded text-sm hover:bg-[#F4EDE0] transition-all">
                      {editingGallery ? 'Update Galeri' : 'Publikasikan Ke Galeri'}
                    </button>
                    {editingGallery && (
                      <button type="button" onClick={() => { setEditingGallery(null); setPreview(null); setGalleryImages([]); }} className="px-4 bg-red-900 rounded text-white text-xs uppercase font-bold">×</button>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleries.map(g => (
                <div key={g.id} className="relative aspect-[4/5] overflow-hidden group rounded-lg border border-[#C4973A4D]">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ background: g.bg.startsWith('http') || g.bg.startsWith('data:') ? `url(${g.bg}) center/cover no-repeat` : g.bg }}></div>
                  <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-between items-start">
                      <button onClick={() => { setEditingGallery(g); setGalleryImages(g.images || []); setPreview(g.bg); setActiveTab('gallery'); window.scrollTo(0,0); }} className="bg-[#C4973A] text-black px-3 py-1 text-xs rounded hover:bg-[#F4EDE0] font-bold">Edit</button>
                      <button onClick={() => deleteDocItem('gallery', g.id)} className="bg-red-900/80 text-white px-3 py-1 text-xs rounded hover:bg-red-600">Hapus</button>
                    </div>
                    <div>
                      <div className="text-[#C4973A] text-[10px] uppercase font-syne mb-1">{g.category}</div>
                      <div className="text-sm font-instrument italic">{g.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'siswa' && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Warga Kelas</h2>
              {students.length === 0 && (
                <button onClick={seedStudents} className="text-xs border border-[#C4973A] px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
              )}
            </div>
            <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 bg-[#3A0A0A] p-6 rounded-lg border border-[#C4973A33]">
              <input required name="absen" defaultValue={editingStudent?.absen || ''} placeholder="No Absen (e.g. 01)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input required name="name" defaultValue={editingStudent?.name || ''} placeholder="Nama Lengkap" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input name="role" defaultValue={editingStudent?.role || ''} placeholder="Jabatan (Opsional)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input name="quote" defaultValue={editingStudent?.quote || ''} placeholder="Kutipan/Quote" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-[#F4EDE0] transition-colors">
                  {editingStudent ? 'Simpan' : 'Tambah'}
                </button>
                {editingStudent && (
                  <button type="button" onClick={() => setEditingStudent(null)} className="px-3 bg-red-900 rounded text-white text-xs">×</button>
                )}
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#F4EDE0]">
                <thead className="bg-[#3A0A0A] text-[#C4973A]">
                  <tr>
                    <th className="p-3">Absen</th>
                    <th className="p-3">Nama Lengkap</th>
                    <th className="p-3">Jabatan</th>
                    <th className="p-3">Quote</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-b border-[#3A0A0A]">
                      <td className="p-3 text-[#C4973A] font-syne-mono">{s.absen}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.role || '-'}</td>
                      <td className="p-3 italic text-xs text-[#F4EDE0]/60 max-w-[200px] truncate">{s.quote || '-'}</td>
                      <td className="p-3 text-right space-x-3">
                        <button onClick={() => { setEditingStudent(s); window.scrollTo(0,0); }} className="text-[#C4973A] hover:underline uppercase text-xs tracking-wider">Edit</button>
                        <button onClick={() => deleteDocItem('students', s.id)} className="text-red-400 hover:text-red-300 uppercase text-xs tracking-wider">Hapus</button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan={4} className="p-6 text-center text-[#F4EDE0]/50">Belum ada data siswa.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'memories' && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Catatan Perjalanan</h2>
              {memories.length === 0 && (
                <button onClick={seedMemories} className="text-xs border border-[#C4973A] px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
              )}
            </div>
            <form onSubmit={addMemory} className="flex flex-col gap-6 mb-8 bg-[#3A0A0A] p-6 rounded-lg border border-[#C4973A33]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                    className="border-2 border-dashed border-[#C4973A4D] rounded-lg h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#C4973A] transition-colors cursor-pointer"
                    onClick={() => document.getElementById('memory-file')?.click()}
                  >
                    {isCompressing ? (
                      <div className="flex flex-col items-center animate-pulse">
                        <div className="w-8 h-8 border-2 border-[#C4973A] border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-[10px] font-syne uppercase tracking-widest text-[#C4973A]">Memproses...</span>
                      </div>
                    ) : (preview || editingMemory?.bg) ? (
                      <div className="absolute inset-0 bg-cover bg-center" style={{ background: (preview || editingMemory?.bg).startsWith('http') || (preview || editingMemory?.bg).startsWith('data:') ? `url(${preview || editingMemory.bg}) center/cover no-repeat` : (preview || editingMemory?.bg) }}></div>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4973A] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span className="text-xs font-syne uppercase tracking-widest text-[#C4973A80]">Upload Foto Polaroid</span>
                      </>
                    )}
                    <input id="memory-file" type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f) handleFile(f); }} />
                    <input type="hidden" name="bg" value={preview || editingMemory?.bg || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input required name="title" defaultValue={editingMemory?.title || ''} placeholder="Judul Momen" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required name="date" defaultValue={editingMemory?.date || ''} placeholder="Tanggal (e.g. Agustus 2025)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                    <input required name="order" type="number" defaultValue={editingMemory?.order || memories.length + 1} placeholder="Urutan (1, 2, ...)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  </div>
                  <input name="rotate" defaultValue={editingMemory?.rotate || '0deg'} placeholder="Rotasi (e.g. -2deg, 1.5deg)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <textarea required name="desc" defaultValue={editingMemory?.desc || ''} placeholder="Deskripsi pendek momen..." className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none h-20" />
                  
                  <div className="flex gap-2 mt-2">
                    <button type="submit" className="flex-1 bg-[#C4973A] text-black font-bold uppercase tracking-widest py-3 rounded text-sm hover:bg-[#F4EDE0] transition-all">
                       {editingMemory ? 'Update Memori' : 'Simpan Memori'}
                    </button>
                    {editingMemory && (
                      <button type="button" onClick={() => { setEditingMemory(null); setPreview(null); }} className="px-6 bg-red-900 rounded text-white uppercase text-xs tracking-widest">Cancel</button>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memories.map(m => (
                <div key={m.id} className="bg-[#FDFAF5] p-3 pb-8 shadow-lg group relative">
                   <div className="h-48 w-full relative flex items-center justify-center overflow-hidden" style={{ background: m.bg.startsWith('http') || m.bg.startsWith('data:') ? `url(${m.bg}) center/cover no-repeat` : m.bg }}>
                      {!m.bg.startsWith('http') && !m.bg.startsWith('data:') && <span className="text-[#3A0A0A]/30 font-bold">No Image</span>}
                   </div>
                   <div className="mt-4 px-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-[#3A0A0A] font-bold text-sm">{m.title}</h3>
                          <p className="text-[#C4973A] text-[10px] font-syne-mono">{m.date}</p>
                        </div>
                        <span className="bg-[#C4973A] text-black text-[10px] px-2 py-0.5 rounded-full font-bold">#{m.order}</span>
                      </div>
                      <p className="text-[#3A0A0A]/70 text-[11px] mt-2 line-clamp-2 italic">{m.desc}</p>
                      
                      <div className="mt-4 flex justify-end space-x-4 border-t border-black/5 pt-3">
                         <button onClick={() => { setEditingMemory(m); setActiveTab('memories'); window.scrollTo(0,0); }} className="text-[#C4973A] text-xs font-bold uppercase tracking-wider hover:underline">Edit</button>
                         <button onClick={() => deleteDocItem('memories', m.id)} className="text-red-600 text-xs font-bold uppercase tracking-wider hover:underline">Hapus</button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
