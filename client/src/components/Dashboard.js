import React, { useContext } from 'react';
import JobDescription from './JobDescription';
import jobsData from './JobData';
import EventDescription from './EventDescription';
import eventsData from './EventData';
import UpdateDescription from './UpdateDescription';
import updatesData from './UpdateData';
import AuthContext from '../context/Auth/authContext';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = ({ isDarkMode }) => {
    const { type } = useContext(AuthContext);
    console.log("Current UserType:", type);
    const navigate = useNavigate();

    const handleAddJobClick = () => {
        navigate('/addjob'); // Navigate to AddJob page
    };

    return (
        <div className={`container my-5 dashboard-container ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <h1 className={"dashboard-title text-center mb-4"}>Dashboard</h1>

            {/* Jobs Section */}
            <section className="dashboard-section">
                <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>Jobs</h2>
                {type === 'Company' ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleAddJobClick}
                    >
                        Add Job
                    </button>
                ) : (
                    <p>UserType is not Company: {type}</p>
                )}
                <div className="row g-4">
                    {jobsData.map((job) => (
                        <div className="col-lg-4 col-md-6" key={job.id}>
                            <div className={`card job-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                                <JobDescription job={job} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Events Section */}
            <section className="dashboard-section mt-5">
                <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>Event Announcements</h2>
                <div className="row g-4">
                    {eventsData.map((event) => (
                        <div className="col-lg-6 col-md-6" key={event.id}>
                            <div className={`card event-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                                <EventDescription event={event} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* News Updates Section */}
            <section className="dashboard-section mt-5">
                <h2 className={`section-title ${isDarkMode ? 'text-white' : 'text-dark'}`}>News Updates</h2>
                <div className="row g-4">
                    {updatesData.map((update) => (
                        <div className="col-lg-6 col-md-6" key={update.id}>
                            <div className={`card update-card ${isDarkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`}>
                                <UpdateDescription update={update} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
