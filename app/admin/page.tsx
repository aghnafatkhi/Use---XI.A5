'use client';

import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, getDoc, collection, addDoc, deleteDoc, onSnapshot, orderBy, query as firestoreQuery, writeBatch } from 'firebase/firestore';
import Link from 'next/link';
import { staticGalleryData, staticStudents } from '../../lib/constants';

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
  const [activeTab, setActiveTab] = useState<'gallery' | 'siswa'>('gallery');
  
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
    const unsubGal = onSnapshot(collection(db, 'gallery'), (snap) => {
      setGalleries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    const unsubSis = onSnapshot(firestoreQuery(collection(db, 'students'), orderBy('absen', 'asc')), (snap) => {
      setStudents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubGal(); unsubSis(); }
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

  const addGallery = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newItem = {
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      bg: fd.get('bg') as string,
      createdAt: Date.now()
    };
    try {
      await addDoc(collection(db, 'gallery'), newItem);
      e.currentTarget.reset();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'gallery');
    }
  };

  const deleteDocItem = async (col: string, id: string) => {
    try {
      await deleteDoc(doc(db, col, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${col}/${id}`);
    }
  };

  const addStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newItem = {
      absen: fd.get('absen') as string,
      name: fd.get('name') as string,
      role: fd.get('role') as string,
    };
    try {
      await addDoc(collection(db, 'students'), newItem);
      e.currentTarget.reset();
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'students');
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
        </div>

        {activeTab === 'gallery' && (
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-syne font-bold uppercase tracking-widest text-[#C4973A]">Manage Gallery</h2>
              {galleries.length === 0 && (
                <button onClick={seedGallery} className="text-xs border border-[#C4973A] px-3 py-1 rounded text-[#C4973A] hover:bg-[#C4973A] hover:text-black transition-all">Impor Data Awal</button>
              )}
            </div>
            <form onSubmit={addGallery} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-[#3A0A0A] p-6 rounded-lg border border-[#C4973A33]">
              <input required name="title" placeholder="Title (e.g. Class Meeting)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input required name="category" placeholder="Category (e.g. Momen)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input required name="bg" placeholder="Image URL / CSS Gradient" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <button type="submit" className="bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-[#F4EDE0] transition-colors">Tambahkan</button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleries.map(g => (
                <div key={g.id} className="relative aspect-[4/5] overflow-hidden group rounded-lg border border-[#C4973A4D]">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ background: g.bg.startsWith('http') ? `url(${g.bg}) center/cover no-repeat` : g.bg }}></div>
                  <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => deleteDocItem('gallery', g.id)} className="self-end bg-red-900/80 text-white px-3 py-1 text-xs rounded hover:bg-red-600">Hapus</button>
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
            <form onSubmit={addStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-[#3A0A0A] p-6 rounded-lg border border-[#C4973A33]">
              <input required name="absen" placeholder="No Absen (e.g. 01)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input required name="name" placeholder="Nama Lengkap" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <input name="role" placeholder="Jabatan (Opsional)" className="bg-[#180808] p-2 rounded text-[#F4EDE0] text-sm border border-transparent focus:border-[#C4973A] outline-none" />
              <button type="submit" className="bg-[#C4973A] text-black font-bold uppercase tracking-wider rounded text-sm hover:bg-[#F4EDE0] transition-colors">Tambahkan</button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#F4EDE0]">
                <thead className="bg-[#3A0A0A] text-[#C4973A]">
                  <tr>
                    <th className="p-3">Absen</th>
                    <th className="p-3">Nama Lengkap</th>
                    <th className="p-3">Jabatan</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-b border-[#3A0A0A]">
                      <td className="p-3 text-[#C4973A] font-syne-mono">{s.absen}</td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3">{s.role || '-'}</td>
                      <td className="p-3 text-right">
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
      </div>
    </div>
  );
}
