import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Users, Calendar, Image as ImageIcon, Trash2, Upload, Plus } from 'lucide-react';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  const [bookings, setBookings] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Upload state
  const [file, setFile] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // Check auth
    if (localStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [bookingsRes, membershipsRes, galleryRes] = await Promise.all([
        axios.get('http://localhost:5000/api/bookings'),
        axios.get('http://localhost:5000/api/memberships'),
        axios.get('http://localhost:5000/api/gallery')
      ]);
      setBookings(bookingsRes.data);
      setMemberships(membershipsRes.data);
      setGallery(galleryRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Silakan pilih gambar terlebih dahulu');

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', imageTitle);

    try {
      await axios.post('http://localhost:5000/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Refresh gallery
      const res = await axios.get('http://localhost:5000/api/gallery');
      setGallery(res.data);
      setFile(null);
      setImageTitle('');
      alert('Gambar berhasil diupload!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Gagal upload gambar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Yakin ingin menghapus gambar ini?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/gallery/${id}`);
      setGallery(gallery.filter(img => img.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Gagal menghapus gambar.');
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin <span className="text-accent">Panel</span></h2>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-btn ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <Calendar size={20} /> Data Booking
          </button>
          <button className={`nav-btn ${activeTab === 'memberships' ? 'active' : ''}`} onClick={() => setActiveTab('memberships')}>
            <Users size={20} /> Data Membership
          </button>
          <button className={`nav-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            <ImageIcon size={20} /> Kelola Gambar
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="nav-btn logout-btn" onClick={handleLogout}>
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="main-header">
          <h1>
            {activeTab === 'bookings' && 'Data Booking Customer'}
            {activeTab === 'memberships' && 'Data Member Eksklusif'}
            {activeTab === 'gallery' && 'Kelola Gambar & Galeri'}
          </h1>
          <button className="btn btn-outline" onClick={fetchData} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Refresh Data'}
          </button>
        </header>

        <div className="content-area">
          {isLoading ? (
            <div className="loading-state">Memuat data...</div>
          ) : (
            <>
              {/* TAB BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama Customer</th>
                        <th>No WhatsApp</th>
                        <th>Tanggal</th>
                        <th>Waktu</th>
                        <th>Tgl Dibuat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.length > 0 ? (
                        bookings.map(b => (
                          <tr key={b.id}>
                            <td>#{b.id}</td>
                            <td>{b.customerName}</td>
                            <td>{b.phoneNumber}</td>
                            <td>{b.bookingDate}</td>
                            <td>{b.bookingTime}</td>
                            <td>{new Date(b.createdAt).toLocaleDateString('id-ID')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="empty-state">Belum ada data booking.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB MEMBERSHIPS */}
              {activeTab === 'memberships' && (
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama Member</th>
                        <th>No WhatsApp</th>
                        <th>Email</th>
                        <th>Paket</th>
                        <th>Tgl Daftar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {memberships.length > 0 ? (
                        memberships.map(m => (
                          <tr key={m.id}>
                            <td>#{m.id}</td>
                            <td>{m.name}</td>
                            <td>{m.phoneNumber}</td>
                            <td>{m.email}</td>
                            <td><span className="badge">{m.packageType}</span></td>
                            <td>{new Date(m.createdAt).toLocaleDateString('id-ID')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="6" className="empty-state">Belum ada data membership.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB GALLERY */}
              {activeTab === 'gallery' && (
                <div className="gallery-manager">
                  <div className="upload-section">
                    <h3>Tambah Gambar Baru</h3>
                    <form className="upload-form" onSubmit={handleUpload}>
                      <div className="form-group">
                        <label className="form-label">Judul Gambar</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Misal: Model Rambut Mullet" 
                          value={imageTitle}
                          onChange={(e) => setImageTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Pilih File</label>
                        <input 
                          type="file" 
                          className="form-control" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={isUploading || !file}>
                        <Upload size={18} /> {isUploading ? 'Mengupload...' : 'Upload Gambar'}
                      </button>
                    </form>
                  </div>

                  <div className="gallery-grid">
                    {gallery.length > 0 ? (
                      gallery.map(img => (
                        <div key={img.id} className="gallery-card">
                          <div className="img-wrapper">
                            <img src={`http://localhost:5000${img.imageUrl}`} alt={img.title} />
                          </div>
                          <div className="gallery-card-footer">
                            <span>{img.title}</span>
                            <button className="btn-icon delete-btn" onClick={() => handleDeleteImage(img.id)} title="Hapus Gambar">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="empty-state">Belum ada gambar di galeri. Silakan upload gambar pertama Anda.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
