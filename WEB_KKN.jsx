import React, { useState, useMemo } from 'react';
import { 
  Home, 
  Users, 
  LayoutGrid, 
  Wallet, 
  CheckSquare, 
  Plus, 
  Download, 
  Trash2, 
  Menu,
  X,
  FileText
} from 'lucide-react';

// --- INITIAL DATA ---
const initialDivisions = [
  { id: 'd1', name: 'Badan Pengurus Harian (BPH)' },
  { id: 'd2', name: 'Divisi Acara' },
  { id: 'd3', name: 'Divisi Humas' },
  { id: 'd4', name: 'Divisi Logistik' },
  { id: 'd5', name: 'Divisi Konsumsi' },
  { id: 'd6', name: 'Divisi PDD' }
];

const initialMembers = [
  { id: 'm1', nim: "A1S123062", name: "Vadel Maulid Maamu", prodi: "Pendidikan Vokasional teknik Elektronika", status: "Kordes", divisionId: 'd1' },
  { id: 'm5', nim: "C1F123101", name: "Salmiati", prodi: "Perpustakaan dan Ilmu Informasi", status: "Sekretaris", divisionId: 'd1' },
  { id: 'm7', nim: "B1A123206", name: "Rahmi", prodi: "Ekonomi Pembangunan", status: "Bendahara", divisionId: 'd1' },
  
  { id: 'm6', nim: "B1A123202", name: "Nurmilatul Hikma", prodi: "Ekonomi Pembangunan", status: "Anggota", divisionId: 'd2' },
  { id: 'm15', nim: "-", name: "Halipa", prodi: "-", status: "Anggota", divisionId: 'd2' },
  { id: 'm8', nim: "S1A123033", name: "SHELVYA ZAHRA NUR RAMADHANI", prodi: "Ilmu Administrasi Negara", status: "Anggota", divisionId: 'd2' },
  
  { id: 'm3', nim: "A1S123027", name: "LA ODE MUHAMAD HARMIN FATAHILA", prodi: "Pendidikan Vokasional teknik Elektronika", status: "Anggota", divisionId: 'd3' },
  { id: 'm16', nim: "-", name: "Rustandi", prodi: "-", status: "Anggota", divisionId: 'd3' },
  
  { id: 'm4', nim: "A1S123022", name: "IYAN SAPUTRA", prodi: "Pendidikan Vokasional teknik Elektronika", status: "Anggota", divisionId: 'd4' },
  { id: 'm2', nim: "E1E123037", name: "LA ODE RIFASAL", prodi: "TEKNIK INFORMATIKA", status: "Anggota", divisionId: 'd4' },
  
  { id: 'm10', nim: "B1A123220", name: "WA SARNI", prodi: "Ekonomi Pembangunan", status: "Anggota", divisionId: 'd5' },
  { id: 'm13', nim: "M1B123104", name: "OKSALINDA RAMADHANI (Ocha)", prodi: "Ilmu Lingkungan", status: "Anggota", divisionId: 'd5' },
  { id: 'm14', nim: "M1B123110", name: "RISKI", prodi: "Ilmu Lingkungan", status: "Anggota", divisionId: 'd5' },
  
  { id: 'm9', nim: "C1F123077", name: "ANISAH", prodi: "Perpustakaan dan Ilmu Informasi", status: "Anggota", divisionId: 'd6' },
  { id: 'm12', nim: "M1B123119", name: "Velin", prodi: "Ilmu Lingkungan", status: "Anggota", divisionId: 'd6' }
];

const initialPrograms = [
  { id: 'p1', title: 'Pembuatan Website Desa', description: 'Proker Individu Teknik Informatika', pic: 'm2', status: 'Direncanakan' },
  { id: 'p2', title: 'Digital Marketing UMKM', description: 'Proker Individu Teknik Informatika', pic: 'm2', status: 'Direncanakan' },
  { id: 'p3', title: 'Sosialisasi Narkoba & Bullying', description: 'Proker Individu Pendidikan Vokasional Teknik', pic: 'm1', status: 'Direncanakan' },
  { id: 'p4', title: 'Pengelolaan Perpustakaan', description: 'Proker Individu Perpustakaan', pic: 'm9', status: 'Direncanakan' },
  { id: 'p5', title: 'Sosialisasi Gemar Menabung', description: 'Proker Individu IESP', pic: 'm7', status: 'Direncanakan' },
  { id: 'p6', title: 'Sosialisasi Menabung', description: 'Proker Individu ADM Negara', pic: 'm8', status: 'Direncanakan' },
  { id: 'p7', title: 'Sosialisasi Ilmu Lingkungan', description: 'Proker Individu FHIL', pic: 'm12', status: 'Direncanakan' }
];

const initialRAB = [
  { id: 'r1', type: 'pengeluaran', category: 'Dokumentasi', description: 'Foto studio', qty: 1, unitPrice: 300000 },
  { id: 'r2', type: 'pengeluaran', category: 'Perlengkapan', description: 'Rompi', qty: 15, unitPrice: 200000 },
  { id: 'r3', type: 'pengeluaran', category: 'Transportasi', description: 'Transportasi 1 pick up (Berangkat)', qty: 1, unitPrice: 1000000 },
  { id: 'r4', type: 'pengeluaran', category: 'Transportasi', description: 'Transportasi balik', qty: 1, unitPrice: 1100000 },
  { id: 'r5', type: 'pengeluaran', category: 'Konsumsi', description: 'Konsumsi', qty: 1, unitPrice: 1700000 },
  { id: 'r6', type: 'pengeluaran', category: 'Operasional', description: 'Listrik', qty: 1, unitPrice: 500000 },
  { id: 'r7', type: 'pengeluaran', category: 'Logistik', description: 'Tabung gas', qty: 1, unitPrice: 100000 },
  { id: 'r8', type: 'pengeluaran', category: 'Publikasi', description: 'Aplikasi Capcut', qty: 1, unitPrice: 100000 },
  { id: 'r9', type: 'pengeluaran', category: 'Publikasi', description: 'Baliho', qty: 1, unitPrice: 150000 },
  { id: 'r10', type: 'pengeluaran', category: 'Lain-lain', description: 'Lainnya / Biaya Tak Terduga', qty: 1, unitPrice: 0 }
];

// Helper to format currency
const formatRp = (amount) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

export default function App() {

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // App State
  const [divisions, setDivisions] = useState(initialDivisions);
  const [members, setMembers] = useState(initialMembers);
  const [programs, setPrograms] = useState(initialPrograms);
  const [rabItems, setRabItems] = useState(initialRAB);
  
  // Initialize finances state based on members
  const [finances, setFinances] = useState(() => {
    return initialMembers.map(m => ({
      memberId: m.id,
      week1: 0,
      week2: 0,
      week3: 0,
      week4: 0
    }));
  });

  // Form States
  const [newDivision, setNewDivision] = useState('');
  const [newMember, setNewMember] = useState({ nim: '', name: '', prodi: '', status: 'Anggota', divisionId: '' });
  const [newProgram, setNewProgram] = useState({ title: '', description: '', pic: '', status: 'Direncanakan' });
  const [newRab, setNewRab] = useState({ type: 'pengeluaran', category: '', description: '', qty: 1, unitPrice: '' });

  // --- ACTIONS ---

  const handleAddDivision = (e) => {
    e.preventDefault();
    if (!newDivision.trim()) return;
    const newDiv = { id: Date.now().toString(), name: newDivision };
    setDivisions([...divisions, newDiv]);
    setNewDivision('');
  };

  const handleDeleteDivision = (id) => {
    if (confirm('Yakin ingin menghapus divisi ini? Anggota di divisi ini akan kehilangan divisinya.')) {
      setDivisions(divisions.filter(d => d.id !== id));
      setMembers(members.map(m => m.divisionId === id ? { ...m, divisionId: '' } : m));
    }
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.nim) return;
    const newId = Date.now().toString();
    const memberToAdd = { ...newMember, id: newId };
    
    setMembers([...members, memberToAdd]);
    setFinances([...finances, { memberId: newId, week1: 0, week2: 0, week3: 0, week4: 0 }]);
    setNewMember({ nim: '', name: '', prodi: '', status: 'Anggota', divisionId: divisions[0]?.id || '' });
  };

  const handleDeleteMember = (id) => {
    if (confirm('Yakin ingin menghapus anggota ini?')) {
      setMembers(members.filter(m => m.id !== id));
      setFinances(finances.filter(f => f.memberId !== id));
      // Reset PIC in programs if deleted
      setPrograms(programs.map(p => p.pic === id ? { ...p, pic: '' } : p));
    }
  };

  const handleUpdateFinance = (memberId, week, value) => {
    const numValue = parseInt(value) || 0;
    setFinances(finances.map(f => f.memberId === memberId ? { ...f, [week]: numValue } : f));
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (!newProgram.title) return;
    setPrograms([...programs, { ...newProgram, id: Date.now().toString() }]);
    setNewProgram({ title: '', description: '', pic: '', status: 'Direncanakan' });
  };

  const handleUpdateProgramStatus = (id, newStatus) => {
    setPrograms(programs.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const handleAddRab = (e) => {
    e.preventDefault();
    if (!newRab.description || !newRab.unitPrice) return;
    setRabItems([...rabItems, { 
      ...newRab, 
      id: Date.now().toString(),
      qty: parseInt(newRab.qty) || 1,
      unitPrice: parseInt(newRab.unitPrice) || 0
    }]);
    setNewRab({ type: 'pengeluaran', category: '', description: '', qty: 1, unitPrice: '' });
  };

  const handleDeleteRab = (id) => {
    if (confirm('Yakin ingin menghapus item RAB ini?')) {
      setRabItems(rabItems.filter(r => r.id !== id));
    }
  };

  // --- EXPORT DATA ---
  const exportToCSV = () => {
    const headers = ['NIM', 'Nama', 'Prodi', 'Status', 'Divisi', 'Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4', 'Total Kas'];
    const rows = members.map(m => {
      const div = divisions.find(d => d.id === m.divisionId)?.name || '-';
      const fin = finances.find(f => f.memberId === m.id) || { week1:0, week2:0, week3:0, week4:0 };
      const total = fin.week1 + fin.week2 + fin.week3 + fin.week4;
      return [m.nim, m.name, m.prodi, m.status, div, fin.week1, fin.week2, fin.week3, fin.week4, total];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Data_KKN_Lengkap.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- CALCULATIONS FOR DASHBOARD ---
  const totalKas = finances.reduce((sum, f) => sum + f.week1 + f.week2 + f.week3 + f.week4, 0);
  const completedPrograms = programs.filter(p => p.status === 'Selesai').length;

  const totalPemasukanRAB = rabItems.filter(r => r.type === 'pemasukan').reduce((sum, r) => sum + (r.qty * r.unitPrice), 0);
  const totalPengeluaranRAB = rabItems.filter(r => r.type === 'pengeluaran').reduce((sum, r) => sum + (r.qty * r.unitPrice), 0);
  const saldoRAB = totalPemasukanRAB - totalPengeluaranRAB;

  // --- RENDERERS ---

  const renderNav = () => (
    <nav className="space-y-2">
      {[
        { id: 'dashboard', icon: Home, label: 'Dashboard' },
        { id: 'divisions', icon: LayoutGrid, label: 'Divisi' },
        { id: 'members', icon: Users, label: 'Anggota' },
        { id: 'finance', icon: Wallet, label: 'Keuangan Kas' },
        { id: 'rab', icon: FileText, label: 'RAB KKN' },
        { id: 'programs', icon: CheckSquare, label: 'Program Kerja' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
              : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
          }`}
        >
          <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-gray-500'} />
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Utama</h2>
          <p className="text-gray-500 text-sm">Ringkasan aktivitas dan data KKN Anda.</p>
        </div>
        <button onClick={exportToCSV} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          <Download size={16} /> Export Data CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <Users size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Anggota</p>
            <h3 className="text-2xl font-bold text-gray-800">{members.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-full">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Kas Terkumpul</p>
            <h3 className="text-2xl font-bold text-gray-800">{formatRp(totalKas)}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-full">
            <CheckSquare size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium">Proker Selesai</p>
            <h3 className="text-2xl font-bold text-gray-800">{completedPrograms} / {programs.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRAB = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Rencana Anggaran Biaya (RAB)</h2>
        <p className="text-gray-500 text-sm">Kelola estimasi pemasukan dan pengeluaran kegiatan KKN.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <p className="text-gray-500 text-xs font-bold uppercase">Total Pemasukan</p>
          <h3 className="text-xl font-bold text-blue-700 mt-1">{formatRp(totalPemasukanRAB)}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <p className="text-gray-500 text-xs font-bold uppercase">Total Estimasi Pengeluaran</p>
          <h3 className="text-xl font-bold text-red-600 mt-1">{formatRp(totalPengeluaranRAB)}</h3>
        </div>
        <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 border-l-4 ${saldoRAB >= 0 ? 'border-l-green-500' : 'border-l-orange-500'}`}>
          <p className="text-gray-500 text-xs font-bold uppercase">Estimasi Saldo</p>
          <h3 className={`text-xl font-bold mt-1 ${saldoRAB >= 0 ? 'text-green-600' : 'text-orange-600'}`}>{formatRp(saldoRAB)}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Tambah Item RAB</h3>
        <form onSubmit={handleAddRab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <select value={newRab.type} onChange={(e) => setNewRab({...newRab, type: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
          <input type="text" placeholder="Kategori (Misal: Logistik)" value={newRab.category} onChange={(e) => setNewRab({...newRab, category: e.target.value})} className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <input type="text" placeholder="Deskripsi Barang/Kegiatan" value={newRab.description} onChange={(e) => setNewRab({...newRab, description: e.target.value})} className="lg:col-span-2 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          <div className="flex gap-2">
            <input type="number" min="1" placeholder="Qty" value={newRab.qty} onChange={(e) => setNewRab({...newRab, qty: e.target.value})} className="w-1/3 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="number" min="0" placeholder="Harga Satuan" value={newRab.unitPrice} onChange={(e) => setNewRab({...newRab, unitPrice: e.target.value})} className="w-2/3 px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition">
            <Plus size={18} /> Tambah
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 border-b rounded-tl-xl w-32">Tipe</th>
                <th className="p-4 border-b">Kategori</th>
                <th className="p-4 border-b">Deskripsi</th>
                <th className="p-4 border-b text-center">Qty</th>
                <th className="p-4 border-b text-right">Harga Satuan</th>
                <th className="p-4 border-b text-right">Subtotal</th>
                <th className="p-4 border-b rounded-tr-xl text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {rabItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">Belum ada data RAB</td>
                </tr>
              )}
              {rabItems.map(item => (
                <tr key={item.id} className="hover:bg-gray-50 transition border-b group">
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.type === 'pemasukan' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {item.type === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{item.category}</td>
                  <td className="p-4 font-medium text-gray-800">{item.description}</td>
                  <td className="p-4 text-center text-gray-600">{item.qty}</td>
                  <td className="p-4 text-right text-gray-600">{formatRp(item.unitPrice)}</td>
                  <td className={`p-4 text-right font-bold ${item.type === 'pemasukan' ? 'text-blue-600' : 'text-gray-800'}`}>
                    {formatRp(item.qty * item.unitPrice)}
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDeleteRab(item.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDivisions = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Divisi</h2>
        <p className="text-gray-500 text-sm">Kelola struktur organisasi kelompok Anda.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleAddDivision} className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Nama Divisi Baru..." 
            value={newDivision}
            onChange={(e) => setNewDivision(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition">
            <Plus size={18} /> Tambah
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {divisions.map(div => {
            const memberCount = members.filter(m => m.divisionId === div.id).length;
            return (
              <div key={div.id} className="p-4 border border-gray-200 rounded-xl bg-gray-50 flex justify-between items-start hover:shadow-md transition">
                <div>
                  <h4 className="font-bold text-gray-800">{div.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{memberCount} Anggota</p>
                </div>
                <button onClick={() => handleDeleteDivision(div.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Daftar Anggota</h2>
        <p className="text-gray-500 text-sm">Kelola mahasiswa yang tergabung dalam posko.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Tambah Anggota Baru</h3>
        <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <input required type="text" placeholder="NIM" value={newMember.nim} onChange={(e) => setNewMember({...newMember, nim: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input required type="text" placeholder="Nama Lengkap" value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input required type="text" placeholder="Program Studi" value={newMember.prodi} onChange={(e) => setNewMember({...newMember, prodi: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <select value={newMember.divisionId} onChange={(e) => setNewMember({...newMember, divisionId: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Pilih Divisi</option>
            {divisions.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition">
            <Plus size={18} /> Simpan
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
                <th className="p-4 border-b rounded-tl-xl">NIM</th>
                <th className="p-4 border-b">Nama Mahasiswa</th>
                <th className="p-4 border-b">Program Studi</th>
                <th className="p-4 border-b">Divisi</th>
                <th className="p-4 border-b rounded-tr-xl">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-gray-50 transition border-b">
                  <td className="p-4 font-medium text-gray-800">{m.nim}</td>
                  <td className="p-4 text-gray-800">
                    {m.name}
                    {m.status === 'Kordes' && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Kordes</span>}
                    {m.status === 'Sekretaris' && <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">Sekretaris</span>}
                    {m.status === 'Bendahara' && <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full">Bendahara</span>}
                  </td>
                  <td className="p-4 text-gray-600">{m.prodi}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      {divisions.find(d => d.id === m.divisionId)?.name || 'Belum Ada'}
                    </span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleDeleteMember(m.id)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinance = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Manajemen Kas Posko</h2>
        <p className="text-gray-500 text-sm">Catat dan pantau pembayaran kas mingguan (Otomatis terjumlah).</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-blue-50 text-blue-900 text-sm font-semibold uppercase tracking-wider">
                <th className="p-4 border-b">Nama</th>
                <th className="p-4 border-b text-center w-32">Minggu 1 (Rp)</th>
                <th className="p-4 border-b text-center w-32">Minggu 2 (Rp)</th>
                <th className="p-4 border-b text-center w-32">Minggu 3 (Rp)</th>
                <th className="p-4 border-b text-center w-32">Minggu 4 (Rp)</th>
                <th className="p-4 border-b text-right">Total</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {members.map(m => {
                const fin = finances.find(f => f.memberId === m.id) || { week1:0, week2:0, week3:0, week4:0 };
                const total = fin.week1 + fin.week2 + fin.week3 + fin.week4;
                return (
                  <tr key={m.id} className="hover:bg-gray-50 transition border-b group">
                    <td className="p-4 font-medium text-gray-800">{m.name}</td>
                    {['week1', 'week2', 'week3', 'week4'].map((week) => (
                      <td key={week} className="p-2 border-b">
                        <input
                          type="number"
                          min="0"
                          value={fin[week] || ''}
                          onChange={(e) => handleUpdateFinance(m.id, week, e.target.value)}
                          className="w-full text-center px-2 py-2 border border-gray-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition group-hover:border-gray-300"
                          placeholder="0"
                        />
                      </td>
                    ))}
                    <td className="p-4 text-right font-bold text-green-600 bg-green-50/30">
                      {formatRp(total)}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-gray-100 font-bold text-gray-800">
                <td className="p-4 text-right uppercase" colSpan="5">Total Seluruh Kas Terkumpul</td>
                <td className="p-4 text-right text-lg text-green-700">{formatRp(totalKas)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Program Kerja (Proker)</h2>
        <p className="text-gray-500 text-sm">Rencanakan dan pantau eksekusi program desa.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Tambah Proker Baru</h3>
        <form onSubmit={handleAddProgram} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input required type="text" placeholder="Nama Program" value={newProgram.title} onChange={(e) => setNewProgram({...newProgram, title: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <input type="text" placeholder="Deskripsi Singkat" value={newProgram.description} onChange={(e) => setNewProgram({...newProgram, description: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          <select required value={newProgram.pic} onChange={(e) => setNewProgram({...newProgram, pic: e.target.value})} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option value="">Pilih Penanggung Jawab</option>
            {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition">
            <Plus size={18} /> Tambah Proker
          </button>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {['Direncanakan', 'Berjalan', 'Selesai'].map(status => (
            <div key={status} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <h4 className={`font-bold mb-4 flex items-center gap-2 
                ${status === 'Direncanakan' ? 'text-gray-600' : status === 'Berjalan' ? 'text-blue-600' : 'text-green-600'}`}>
                <div className={`w-2 h-2 rounded-full ${status === 'Direncanakan' ? 'bg-gray-400' : status === 'Berjalan' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                {status} ({programs.filter(p => p.status === status).length})
              </h4>
              <div className="space-y-3">
                {programs.filter(p => p.status === status).map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow transition">
                    <h5 className="font-bold text-gray-800 text-sm mb-1">{p.title}</h5>
                    <p className="text-xs text-gray-500 mb-3">{p.description}</p>
                    
                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100">
                      <span className="text-[10px] uppercase font-bold text-gray-400">
                        PJ: {members.find(m => m.id === p.pic)?.name?.split(' ')[0] || '-'}
                      </span>
                      <select 
                        value={p.status}
                        onChange={(e) => handleUpdateProgramStatus(p.id, e.target.value)}
                        className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 outline-none cursor-pointer"
                      >
                        <option value="Direncanakan">Direncanakan</option>
                        <option value="Berjalan">Berjalan</option>
                        <option value="Selesai">Selesai</option>
                      </select>
                    </div>
                  </div>
                ))}
                {programs.filter(p => p.status === status).length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">Kosong</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-800 font-sans flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="font-bold text-xl text-blue-700 flex items-center gap-2">
          <LayoutGrid size={24} /> KKN App
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 ease-in-out
        fixed md:sticky top-0 left-0 z-10 w-64 h-screen bg-white border-r border-gray-200 flex flex-col
      `}>
        <div className="p-6 border-b border-gray-100 hidden md:block">
          <h1 className="font-black text-2xl text-blue-700 tracking-tight flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <LayoutGrid size={20} />
            </div>
            Sistem KKN
          </h1>
          <p className="text-xs text-gray-400 mt-1">Management Portal v2.0</p>
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto">
          {renderNav()}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-800 font-medium">Informasi</p>
            <p className="text-[10px] text-blue-600 mt-1">Gunakan perangkat layar besar (Laptop/Tablet) untuk pengalaman terbaik pada tabel.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 w-full max-w-[100vw] overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'divisions' && renderDivisions()}
          {activeTab === 'members' && renderMembers()}
          {activeTab === 'finance' && renderFinance()}
          {activeTab === 'rab' && renderRAB()}
          {activeTab === 'programs' && renderPrograms()}
        </div>
      </main>

    </div>
  );
}