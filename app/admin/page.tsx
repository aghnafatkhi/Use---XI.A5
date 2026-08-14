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
  const [authError, setAuthError] = useState<string | null>(null);

  const [galleries, setGalleries] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'gallery' | 'siswa' | 'memories'>('gallery');
  const [editingStudent, setEditingStudent] = useState<any | null>(null);
  const [editingMemory, setEditingMemory] = useState<any | null>(null);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewItem, setPreviewItem] = useState<any | null>(null);
  const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);

  const hasOldStudents = students.some(s => s.name === 'Abyan Dzaky Pratama' || s.name === 'Adinda Putri Rahayu');

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
        if (u.email === 'aghna1011@gmail.com' || u.email === 'ghinaayundiafairuzsosiologix1@gmail.com') {
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
    const unsubSis = onSnapshot(firestoreQuery(collection(db, 'students'), orderBy('absen', 'asc')), async (snap) => {
      const dbStudents = snap.docs.map(d => ({ id: d.id, ...d.data() })) as any[];
      setStudents(dbStudents);

      const oldCheck = dbStudents.some(s => 
        s.name === 'Abyan Dzaky Pratama' || 
        s.name === 'Adinda Putri Rahayu' || 
        s.name === 'Aghna Fatkhi Putra Buono' || 
        s.name === 'Kevin Caresto Gisella.S' || 
        s.name === 'Rasendria Bhamakerti'
      );
      const rolesOutOfSync = dbStudents.some(dbS => {
        const staticS = staticStudents.find(s => s.absen === dbS.absen);
        return staticS && staticS.role !== dbS.role;
      });
      if (dbStudents.length > 0 && (oldCheck || dbStudents.length < 30 || rolesOutOfSync)) {
        try {
          const batch = writeBatch(db);
          dbStudents.forEach(s => {
            if (s.id) {
              batch.delete(doc(db, 'students', s.id));
            }
          });
          staticStudents.forEach(item => {
            const newDoc = doc(collection(db, 'students'));
            batch.set(newDoc, item);
          });
          await batch.commit();
          console.log('Auto Sync: Successfully updated database with the new XI.A5 student roster.');
        } catch (err) {
          console.error('Auto Sync Error:', err);
        }
      } else if (snap.empty) {
        try {
          const batch = writeBatch(db);
          staticStudents.forEach(item => {
            const newDoc = doc(collection(db, 'students'));
            batch.set(newDoc, item);
          });
          await batch.commit();
          console.log('Auto Sync: Seeded database with the new XI.A5 student roster.');
        } catch (err) {
          console.error('Auto Seed Error:', err);
        }
      }
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
    const isOverwrite = students.length > 0;
    const confirmMsg = isOverwrite 
      ? 'Peringatan: Tindakan ini akan menghapus semua anggota kelas saat ini di database dan menyinkronkan ulang dengan daftar absen baru (XI.A5 - 36 Siswa). Lanjutkan?'
      : 'Impor data anggota kelas awal (XI.A5 - 36 Siswa)?';
    
    if (!confirm(confirmMsg)) return;
    try {
      const batch = writeBatch(db);
      
      // Clear existing records if overwriting
      if (isOverwrite) {
        students.forEach(s => {
          if (s.id) {
            batch.delete(doc(db, 'students', s.id));
          }
        });
      }
      
      // Add all static students
      staticStudents.forEach(item => {
        const newDoc = doc(collection(db, 'students'));
        batch.set(newDoc, item);
      });
      
      await batch.commit();
      alert('Daftar anggota kelas berhasil disinkronkan ke database!');
    } catch (err) {
      console.error(err);
      alert('Gagal menyinkronkan data anggota kelas.');
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
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (e: any) {
      console.error(e);
      let errorMsg = e?.message || String(e);
      if (e?.code === 'auth/popup-blocked') {
        errorMsg = 'Popup login diblokir oleh browser. Harap ijinkan popup untuk situs ini atau gunakan browser lain.';
      }
      setAuthError(errorMsg);
    }
  };

  if (loading) return <div className="p-10 text-[#F4EDE0]">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#180808] p-4 text-center">
        <div className="bg-[#3A0A0A] p-8 rounded-lg border border-[#C4973A4D] shadow-xl max-w-md w-full">
          <h1 className="text-2xl font-instrument italic text-[#C4973A] mb-4">Admin Login</h1>
          <p className="text-xs text-[#F4EDE0]/70 mb-6">
            Khusus Admin Kelas (aghna1011@gmail.com & ghinaayundiafairuzsosiologix1@gmail.com)
          </p>
          <button onClick={login} className="w-full px-6 py-2 bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-[#F4EDE0] transition-colors">
            Login dengan Google
          </button>
          {authError && (
            <div className="mt-4 p-3 bg-red-950/50 border border-red-500/50 text-red-200 text-[11px] rounded text-left">
              <strong>Error:</strong> {authError}
              <div className="mt-2 text-red-300">
                💡 <em>Tips:</em> Jika kamu membuka dalam iframe (layar preview di AI Studio), pastikan Anda mengeklik tombol <strong>&quot;Open in New Tab&quot;</strong> di kanan atas preview, lalu coba login dari tab baru tersebut.
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#180808] p-4 text-center">
        <div className="bg-[#3A0A0A] p-8 rounded-lg border border-[#C4973A4D] shadow-xl max-w-md w-full">
          <h1 className="text-xl text-red-400 font-bold mb-2">Akses Ditolak</h1>
          <p className="text-sm text-[#F4EDE0]/90 mb-4 font-mono">
            Email login: <span className="text-[#C4973A]">{user.email}</span>
          </p>
          <p className="text-xs text-[#F4EDE0]/70 mb-6 leading-relaxed">
            Email ini tidak terdaftar sebagai Admin Kelas Utama.<br />
            Pastikan kamu login menggunakan salah satu email berikut:<br />
            1. <strong className="text-white">aghna1011@gmail.com</strong><br />
            2. <strong className="text-white">ghinaayundiafairuzsosiologix1@gmail.com</strong>
          </p>
          <div className="flex gap-2">
            <button onClick={login} className="flex-1 px-4 py-2 bg-[#C4973A] text-black font-bold text-xs uppercase tracking-wider rounded hover:bg-[#F4EDE0] transition-colors">
              Ganti Akun Google
            </button>
            <button onClick={() => signOut(auth)} className="flex-1 px-4 py-2 border border-[#C4973A] text-[#C4973A] font-bold text-xs uppercase tracking-wider rounded hover:bg-red-950 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#130606] text-[#F4EDE0] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-[#C4973A33]">
          <h1 className="text-2xl md:text-3xl font-instrument italic text-[#C4973A] mb-4 md:mb-0">Panel Admin XI.A5</h1>
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="/" className="text-[10px] md:text-sm uppercase tracking-widest text-[#F4EDE0]/70 hover:text-[#C4973A]">Kembali ke Web</Link>
            <button onClick={() => signOut(auth)} className="text-[10px] md:text-sm uppercase tracking-widest text-[#F4EDE0]/70 hover:text-[#C4973A]">Logout</button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 mb-8 no-scrollbar md:space-x-4 gap-3">
          <button onClick={() => setActiveTab('gallery')} className={`whitespace-nowrap px-4 py-2 font-syne uppercase text-[10px] md:text-sm flex-shrink-0 ${activeTab === 'gallery' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Galeri Foto</button>
          <button onClick={() => setActiveTab('siswa')} className={`whitespace-nowrap px-4 py-2 font-syne uppercase text-[10px] md:text-sm flex-shrink-0 ${activeTab === 'siswa' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Anggota Kelas</button>
          <button onClick={() => setActiveTab('memories')} className={`whitespace-nowrap px-4 py-2 font-syne uppercase text-[10px] md:text-sm flex-shrink-0 ${activeTab === 'memories' ? 'bg-[#C4973A] text-black font-bold' : 'bg-[#3A0A0A] text-[#F4EDE0] border border-[#C4973A4D] hover:border-[#C4973A]'}`}>Catatan Perjalanan</button>
        </div>

        {activeTab === 'gallery' && (
          <section className="mb-12">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg md:text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Kelola Galeri Foto</h2>
                    {galleries.length === 0 && (
                      <button onClick={seedGallery} className="text-[10px] md:text-xs border border-[#C4973A] px-2 md:px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
                    )}
                  </div>
                  <form onSubmit={handleGalleryCreate} className="flex flex-col gap-4 md:gap-6 mb-8 bg-[#3A0A0A] p-4 md:p-6 rounded-lg border border-[#C4973A33]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-4">
                        <div 
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                          className="border-2 border-dashed border-[#C4973A4D] rounded-lg h-32 md:h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#C4973A] transition-colors cursor-pointer"
                          onClick={() => document.getElementById('file-input')?.click()}
                        >
                    {isCompressing ? (
                      <div className="flex flex-col items-center animate-pulse">
                        <div className="w-8 h-8 border-2 border-[#C4973A] border-t-transparent rounded-full animate-spin mb-2"></div>
                        <span className="text-[10px] font-syne uppercase tracking-widest text-[#C4973A]">Memproses...</span>
                      </div>
                    ) : (
                      <>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4973A] mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <span className="text-xs font-syne uppercase tracking-widest text-[#C4973A80]">Upload Foto</span>
                        <span className="text-[9px] text-[#F4EDE04D] mt-1 text-center px-4">Bisa pilih banyak sekaligus atau satu per satu</span>
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
                    <div className="bg-[#180808] p-3 rounded border border-[#C4973A33]">
                      <p className="text-[10px] uppercase font-syne tracking-widest text-[#C4973A] mb-3">Antrean Foto ({galleryImages.length})</p>
                      <div className="flex flex-wrap gap-3">
                         {galleryImages.map((img, i) => (
                           <div key={i} className="relative w-16 h-16 bg-cover bg-center rounded border border-[#C4973A4D]" style={{ backgroundImage: `url(${img})` }}>
                             {i === 0 && (
                               <div className="absolute -bottom-1 -left-1 bg-[#C4973A] text-black text-[7px] font-bold px-1 rounded uppercase">Utama</div>
                             )}
                             <button type="button" onClick={() => setGalleryImages(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs shadow-lg">×</button>
                           </div>
                         ))}
                         {galleryImages.length > 0 && (
                           <button type="button" onClick={() => setGalleryImages([])} className="flex flex-col items-center justify-center w-16 h-16 border border-dashed border-red-900/50 rounded text-red-400 hover:bg-red-900/10 transition-colors" title="Hapus Semua">
                             <span className="text-[8px] uppercase font-bold">Reset</span>
                           </button>
                         )}
                      </div>
                      <p className="text-[9px] text-[#F4EDE04D] mt-3 italic">* Foto pertama otomatis menjadi sampul (background).</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  <input required name="title" defaultValue={editingGallery?.title || ''} placeholder="Judul Foto (e.g. Momen KBM)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <input required name="category" maxLength={50} defaultValue={editingGallery?.category || ''} placeholder="Deskripsi Momen (Maks. 50 Karakter)" className="bg-[#180808] p-3 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
                  <div className="pt-2 flex gap-2">
                    <button type="submit" className="flex-1 bg-[#C4973A] text-black font-bold uppercase tracking-widest py-3 rounded text-sm hover:bg-[#F4EDE0] transition-all">
                      {editingGallery ? 'Update Galeri' : 'Tambah Ke Galeri'}
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
                  <div 
                    onClick={() => { setPreviewItem(g); setPreviewImageIndex(0); }}
                    className="absolute inset-0 bg-black/60 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="flex justify-between items-start z-10">
                      <button onClick={(e) => { e.stopPropagation(); setEditingGallery(g); setGalleryImages(g.images || []); setPreview(g.bg); setActiveTab('gallery'); window.scrollTo(0,0); }} className="bg-[#C4973A] text-black px-3 py-1 text-xs rounded hover:bg-[#F4EDE0] font-bold">Edit</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteDocItem('gallery', g.id); }} className="bg-red-900/80 text-white px-3 py-1 text-xs rounded hover:bg-red-600">Hapus</button>
                    </div>
                    
                    {/* Centered Preview Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-black/60 border border-[#C4973A] text-[#C4973A] text-[10px] md:text-xs font-syne uppercase tracking-widest px-3 py-1.5 rounded-full font-bold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Pratinjau
                      </span>
                    </div>

                    <div className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10">
                      <div className="text-[#C4973A] text-[10px] uppercase font-syne mb-1 font-bold">{g.category}</div>
                      <div className="text-sm font-instrument italic text-white">{g.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'siswa' && (
          <section className="mb-12">
            {hasOldStudents && (
              <div className="bg-amber-950/80 border border-amber-600/50 p-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-amber-400 font-bold font-syne text-sm uppercase">Absen Kelas Tidak Sinkron Terdeteksi!</h3>
                  <p className="text-xs text-[#F4EDE0]/80 mt-1">Sistem mendeteksi data anggota kelas di database atau perannya belum sepenuhnya sinkron dengan absen terbaru (XI.A5). Silakan klik tombol di samping untuk menyinkronkan ke absen resmi baru (XI.A5).</p>
                </div>
                <button onClick={seedStudents} className="bg-amber-600 hover:bg-amber-500 text-black font-extrabold uppercase tracking-widest text-[11px] px-4 py-2 rounded transition-all whitespace-nowrap">
                  Sinkronkan Baru Sekarang
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Anggota Kelas ({students.length})</h2>
              <button onClick={seedStudents} className="text-xs border border-[#C4973A] px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">
                {students.length === 0 ? 'Impor Data Awal' : 'Reset & Sync Absen Baru'}
              </button>
            </div>
            <form onSubmit={addStudent} className="flex flex-col md:grid md:grid-cols-5 gap-4 mb-8 bg-[#3A0A0A] p-4 md:p-6 rounded-lg border border-[#C4973A33]">
              <input required name="absen" defaultValue={editingStudent?.absen || ''} placeholder="No Absen (e.g. 01)" className="bg-[#180808] p-3 md:p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none w-full" />
              <input required name="name" defaultValue={editingStudent?.name || ''} placeholder="Nama Lengkap" className="bg-[#180808] p-3 md:p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none w-full" />
              <input name="role" defaultValue={editingStudent?.role || ''} placeholder="Jabatan (Opsional)" className="bg-[#180808] p-3 md:p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none w-full" />
              <input name="quote" defaultValue={editingStudent?.quote || ''} placeholder="Kutipan/Quote" className="bg-[#180808] p-3 md:p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none w-full" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm py-3 md:py-0 hover:bg-[#F4EDE0] transition-colors">
                  {editingStudent ? 'Simpan' : 'Tambah'}
                </button>
                {editingStudent && (
                  <button type="button" onClick={() => setEditingStudent(null)} className="px-4 md:px-3 bg-red-900 rounded text-white text-xs">×</button>
                )}
              </div>
            </form>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs md:text-sm text-[#F4EDE0] border-collapse">
                <thead className="bg-[#3A0A0A] text-[#C4973A] uppercase tracking-wider text-[10px] md:text-xs">
                  <tr>
                    <th className="p-2 md:p-3">No</th>
                    <th className="p-2 md:p-3">Nama</th>
                    <th className="p-2 md:p-3">Peran</th>
                    <th className="p-2 md:p-3">Quote</th>
                    <th className="p-2 md:p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-b border-[#3A0A0A] hover:bg-[#3A0A0A]/30 transition-colors">
                      <td className="p-2 md:p-3 text-[#C4973A] font-syne-mono">{s.absen}</td>
                      <td className="p-2 md:p-3 font-bold md:font-normal whitespace-nowrap">{s.name}</td>
                      <td className="p-2 md:p-3 opacity-70 whitespace-nowrap">{s.role || '-'}</td>
                      <td className="p-2 md:p-3 italic text-[10px] text-[#F4EDE0]/60 max-w-[120px] md:max-w-[200px] truncate">{s.quote || '-'}</td>
                      <td className="p-2 md:p-3 text-right space-x-2 md:space-x-3 whitespace-nowrap">
                        <button onClick={() => { setEditingStudent(s); window.scrollTo(0,0); }} className="text-[#C4973A] hover:underline uppercase text-[10px] md:text-xs tracking-wider font-bold">Edit</button>
                        <button onClick={() => deleteDocItem('students', s.id)} className="text-red-400 hover:text-red-300 uppercase text-[10px] md:text-xs tracking-wider font-bold">Hapus</button>
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
              <h2 className="text-lg md:text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Catatan Perjalanan</h2>
              {memories.length === 0 && (
                <button onClick={seedMemories} className="text-[10px] md:text-xs border border-[#C4973A] px-2 md:px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
              )}
            </div>
            <form onSubmit={addMemory} className="flex flex-col gap-4 md:gap-6 mb-8 bg-[#3A0A0A] p-4 md:p-6 rounded-lg border border-[#C4973A33]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if(f) handleFile(f); }}
                    className="border-2 border-dashed border-[#C4973A4D] rounded-lg h-32 md:h-48 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#C4973A] transition-colors cursor-pointer"
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

      {/* IMAGE PREVIEW MODAL */}
      {previewItem && (
        <div className="fixed inset-0 z-[5000] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md" onClick={() => setPreviewItem(null)}>
          <div className="relative max-w-4xl w-full bg-[#1c0707] border border-[#C4973A4D] rounded-xl overflow-hidden shadow-2xl p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              onClick={() => setPreviewItem(null)} 
              className="absolute top-4 right-4 text-white/70 hover:text-[#C4973A] transition-colors p-2 z-50 bg-black/40 rounded-full cursor-pointer"
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Title / Header */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-syne tracking-widest text-[#C4973A] font-bold block mb-1">{previewItem.category}</span>
              <h3 className="text-lg md:text-xl font-instrument italic text-[#F4EDE0]">{previewItem.title}</h3>
            </div>

            {/* Main Image Container */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] bg-[#0c0303] rounded-lg overflow-hidden flex items-center justify-center border border-[#C4973A1A] group">
              {/* Previous Button */}
              {previewItem.images && previewItem.images.length > 1 && (
                <button 
                  onClick={() => setPreviewImageIndex((prev) => (prev - 1 + previewItem.images.length) % previewItem.images.length)}
                  className="absolute left-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-all hover:text-[#C4973A] cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Next Button */}
              {previewItem.images && previewItem.images.length > 1 && (
                <button 
                  onClick={() => setPreviewImageIndex((prev) => (prev + 1) % previewItem.images.length)}
                  className="absolute right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2.5 transition-all hover:text-[#C4973A] cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* The Photo */}
              <img 
                src={previewItem.images && previewItem.images.length > 0 ? previewItem.images[previewImageIndex] : previewItem.bg} 
                alt={previewItem.title} 
                className="max-h-[55vh] md:max-h-[60vh] max-w-full object-contain select-none"
              />

              {/* Pagination counter */}
              {previewItem.images && previewItem.images.length > 1 && (
                <div className="absolute bottom-4 bg-black/60 text-[#F4EDE0] text-xs font-syne px-3 py-1 rounded-full border border-[#C4973A22]">
                  {previewImageIndex + 1} / {previewItem.images.length}
                </div>
              )}
            </div>

            {/* Quick Actions Panel */}
            <div className="mt-5 pt-4 border-t border-[#C4973A1A] flex flex-wrap gap-3 items-center justify-between">
              <span className="text-xs text-[#F4EDE080] font-syne-mono">
                ID: {previewItem.id}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setEditingGallery(previewItem);
                    setGalleryImages(previewItem.images || []);
                    setPreview(previewItem.bg);
                    setActiveTab('gallery');
                    setPreviewItem(null);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-[#C4973A] text-black px-4 py-2 text-xs uppercase font-syne tracking-widest font-bold rounded hover:bg-[#F4EDE0] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Item
                </button>
                <button 
                  onClick={async () => {
                    const confirmDel = confirm('Apakah kamu yakin ingin menghapus data ini?');
                    if (!confirmDel) return;
                    await deleteDocItem('gallery', previewItem.id);
                    setPreviewItem(null);
                  }}
                  className="bg-red-900/90 text-white px-4 py-2 text-xs uppercase font-syne tracking-widest font-bold rounded hover:bg-red-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hapus Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
