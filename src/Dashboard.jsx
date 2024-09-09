import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db, storage } from './_helpers/FirebaseConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const [queriesData, setQueriesData] = useState([]);
  const [contactEmailsData, setContactEmailsData] = useState([]);
  const [cvData, setCvData] = useState([]);
  const [lastVisibleQuery, setLastVisibleQuery] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('queries'); // Tabs: queries, contactEmails, cvData

  // Fetch Queries ordered by createdAt
  const fetchQueries = async () => {
    setLoading(true);
    const q = query(collection(db, 'Queries'), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setQueriesData(data);
    setLastVisibleQuery(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setLoading(false);
  };

  // Fetch Contact Emails ordered by createdAt
  const fetchContactEmails = async () => {
    setLoading(true);
    const q = query(collection(db, 'contactEmails'), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setContactEmailsData(data);
    setLoading(false);
  };

  // Fetch CV Data ordered by createdAt
  const fetchCvData = async () => {
    setLoading(true);
    const q = query(collection(db, 'cvData'), orderBy('createdAt', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCvData(data);
    setLoading(false);
  };

  // Function to download CV from Firebase Storage
  const downloadCV = async (cvURL) => {
    const cvRef = ref(storage, cvURL);
    const downloadURL = await getDownloadURL(cvRef);
    const a = document.createElement('a');
    a.href = downloadURL;
    a.download = 'cv.pdf';
    a.click();
  };

  // Handle pagination
  const handlePagination = async () => {
    setLoading(true);
    const nextQuery = query(collection(db, activeTab), orderBy('createdAt', 'desc'), startAfter(lastVisibleQuery), limit(10));
    const querySnapshot = await getDocs(nextQuery);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    if (activeTab === 'queries') {
      setQueriesData((prevData) => [...prevData, ...data]);
    } else if (activeTab === 'contactEmails') {
      setContactEmailsData((prevData) => [...prevData, ...data]);
    } else if (activeTab === 'cvData') {
      setCvData((prevData) => [...prevData, ...data]);
    }
    
    setLastVisibleQuery(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setCurrentPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'queries') fetchQueries();
    else if (activeTab === 'contactEmails') fetchContactEmails();
    else if (activeTab === 'cvData') fetchCvData();
  }, [activeTab]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>Dashboard</h1>
      
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary mx-2" onClick={() => setActiveTab('queries')}>Read Queries</button>
        <button className="btn btn-primary mx-2" onClick={() => setActiveTab('contactEmails')}>Read Contact Emails</button>
        <button className="btn btn-primary mx-2" onClick={() => setActiveTab('cvData')}>See CV Data</button>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {activeTab === 'queries' && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>PhoneNo</th>
                  <th>Query</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {queriesData.map((query) => (
                  <tr key={query.id}>
                    <td>{query.Email}</td>
                    <td>{query.Name}</td>
                    <td>{query.PhoneNo}</td>
                    <td>{query.Query}</td>
                    <td>{new Date(query.createdAt).toLocaleString()}</td> {/* Display formatted date */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'contactEmails' && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>PhoneNo</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {contactEmailsData.map((emailData) => (
                  <tr key={emailData.id}>
                    <td>{emailData.Email}</td>
                    <td>{emailData.PhoneNo}</td>
                    <td>{new Date(emailData.createdAt).toLocaleString()}</td> {/* Display formatted date */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'cvData' && (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Download CV</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {cvData.map((cv) => (
                  <tr key={cv.id}>
                    <td>{cv.email}</td>
                    <td>{cv.phone}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => downloadCV(cv.cvURL)}>Download CV</button>
                    </td>
                    <td>{new Date(cv.createdAt).toLocaleString()}</td> {/* Display formatted date */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-secondary" onClick={handlePagination}>Load More</button>
          </div>
        </div>
      )}
    </div>
  );
}
