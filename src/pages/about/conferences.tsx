import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, X, Calendar, MapPin, Users } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import pic1 from "../../components/images/pic1.jpeg";
import pic2 from "../../components/images/pic2.jpeg";
import pic3 from "../../components/images/pic3.jpeg";

interface Conference {
  title: string;
  publisher: string;
  year: number;
  hasHistory: boolean;
  description: string;
  date: string;
  location: string;
  image: string;
  attendees: string;
}

interface Publisher {
  name: string;
  count: number;
}

interface Topic {
  name: string;
  count: number;
}

interface YearRange {
  start: number;
  end: number;
}

const ConferenceBrowser = () => {
  useEffect(() => {
    AOS.init({
      duration: 300, // Changed from 1000 to 300
      once: true,
    });
  }, []);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedHistories, setExpandedHistories] = useState(new Set());
  const [yearRange, setYearRange] = useState({ start: 1936, end: 2025 });
  const [selectedPublishers, setSelectedPublishers] = useState(new Set());
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [yearFilterType, setYearFilterType] = useState('range');
  const [singleYear, setSingleYear] = useState(2024);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    year: true,
    publisher: true,
    topic: true
  });

  // Sample data
  const publishers = [
    { name: "IEEE", count: 35584 },
    { name: "IET", count: 2796 },
    { name: "VDE", count: 281 },
    { name: "Prometheus GmbH", count: 1 }
  ];

  const topics = [
    { name: "Computing and Processing", count: 24594 },
    { name: "Communication, Networking and Broadcast Technologies", count: 17382 },
    { name: "Components, Circuits, Devices and Systems", count: 15377 },
    { name: "Signal Processing and Analysis", count: 12571 },
    { name: "Robotics and Control Systems", count: 9386 }
  ];

  const conferences = [
    {
      title: "2024 International Cybersecurity Summit (ICS)",
      publisher: "IEEE",
      year: 2024,
      hasHistory: true,
      description: "Focus on emerging threats, AI in cybersecurity, and zero-trust architecture",
      date: "March 15-17, 2024",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      attendees: "500+"
    },
    {
      title: "Global Threat Intelligence Conference 2024",
      publisher: "IET",
      year: 2024,
      hasHistory: true,
      description: "Latest developments in threat detection, incident response, and cyber defense",
      date: "April 8-10, 2024",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      attendees: "400+"
    },
    {
      title: "Global Threat Intelligence Conference 2024",
      publisher: "IET",
      year: 2024,
      hasHistory: true,
      description: "Latest developments in threat detection, incident response, and cyber defense",
      date: "April 8-10, 2024",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      attendees: "400+"
    },
    {
      title: "Global Threat Intelligence Conference 2024",
      publisher: "IET",
      year: 2024,
      hasHistory: true,
      description: "Latest developments in threat detection, incident response, and cyber defense",
      date: "April 8-10, 2024",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      attendees: "400+"
    },
    {
      title: "Cyber Defense Summit 2024",
      publisher: "IEEE",
      year: 2024,
      hasHistory: true,
      description: "Strategic approaches to cybersecurity, featuring industry leaders and experts",
      date: "May 20-22, 2024",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
      attendees: "600+"
    },
    {
      title: "2024 International Cybersecurity Summit (ICS)",
      publisher: "IEEE",
      year: 2024,
      hasHistory: true,
      description: "Focus on emerging threats, AI in cybersecurity, and zero-trust architecture",
      date: "March 15-17, 2024",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      attendees: "500+"
    },
    {
      title: "2024 International Cybersecurity Summit (ICS)",
      publisher: "IEEE",
      year: 2024,
      hasHistory: true,
      description: "Focus on emerging threats, AI in cybersecurity, and zero-trust architecture",
      date: "March 15-17, 2024",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
      attendees: "500+"
    },
  ];

  // Handler functions
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleHistory = useCallback((index: unknown) => {
    setExpandedHistories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const togglePublisher = useCallback((publisherName: unknown) => {
    setSelectedPublishers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(publisherName)) {
        newSet.delete(publisherName);
      } else {
        newSet.add(publisherName);
      }
      return newSet;
    });
  }, []);

  const toggleTopic = useCallback((topicName: unknown) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicName)) {
        newSet.delete(topicName);
      } else {
        newSet.add(topicName);
      }
      return newSet;
    });
  }, []);

  const handleYearRangeChange = useCallback((type: any, value: any) => {
    setYearRange(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

  const clearYearFilter = useCallback(() => {
    if (yearFilterType === 'range') {
      setYearRange({ start: 1936, end: 2025 });
    } else {
      setSingleYear(2024);
    }
  }, [yearFilterType]);

  // Memoized filtered conferences
  const filteredConferences = useMemo(() => {
    return conferences.filter(conference => {
      const matchesSearch = conference.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = yearFilterType === 'range' 
        ? conference.year >= yearRange.start && conference.year <= yearRange.end
        : conference.year === singleYear;
      const matchesPublisher = selectedPublishers.size === 0 || selectedPublishers.has(conference.publisher);
      return matchesSearch && matchesYear && matchesPublisher;
    });
  }, [conferences, searchQuery, yearFilterType, yearRange, singleYear, selectedPublishers]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Cybersecurity Conferences</h1>
          <p className="text-lg opacity-90">
            Explore global cybersecurity conferences, summits, and symposiums
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Promotional Content */}
          <div className="col-span-3 space-y-4">
            <div className="bg-gradient-to-br from-red-500 to-red-900 rounded-lg overflow-hidden shadow-lg">
              <img
                src={pic1}
                alt="Upcoming Conferences"
                className="w-full h-64 object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="p-4 text-white">
                <h3 className="font-bold">Upcoming Events</h3>
                <p className="text-sm opacity-90">Register for upcoming cybersecurity conferences</p>
              </div>
            </div>
            <div className="bg-[#00629B] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={pic2}
                alt="Full Text Access"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
            <div className="bg-[#900] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img
                src={pic3}
                alt="IEEE Business Management"
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            {/* Search Bar */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex gap-4 mb-4">
                <button className="font-medium text-red-500 border-b-2 border-red-500 pb-1">By Title</button>
                <button className="text-gray-600 hover:text-red-500">By Topic</button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conferences..."
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Conference List */}
            <div className="space-y-4">
              {filteredConferences.map((conference, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-start gap-2">
                    <button
                      onClick={() => toggleHistory(index)}
                      className="mt-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {expandedHistories.has(index) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-900 hover:text-red-500 transition-colors cursor-pointer">
                        {conference.title}
                      </h2>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-red-500" />
                          {conference.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-red-500" />
                          {conference.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-red-500" />
                          {conference.attendees}
                        </span>
                      </div>
                      {expandedHistories.has(index) && (
                        <div className="mt-3 pl-4 border-l-2 border-red-100">
                          <p className="text-gray-600 mb-3">{conference.description}</p>
                          <button className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium">
                            Learn more <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Filters */}
          <div className="col-span-3 space-y-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('year')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Year</span>
                {expandedSections.year ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.year && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="range"
                      name="yearType"
                      checked={yearFilterType === 'range'}
                      onChange={() => setYearFilterType('range')}
                      className="text-[#663399]"
                    />
                    <label htmlFor="range">Range</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="singleYear"
                      name="yearType"
                      checked={yearFilterType === 'single'}
                      onChange={() => setYearFilterType('single')}
                      className="text-[#663399]"
                    />
                    <label htmlFor="singleYear">Single Year</label>
                  </div>
                  {yearFilterType === 'range' ? (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="number"
                        value={yearRange.start}
                        onChange={(e) => handleYearRangeChange('start', parseInt(e.target.value))}
                        className="w-20 border p-1 rounded"
                        min="1936"
                        max={yearRange.end}
                      />
                      <input
                        type="number"
                        value={yearRange.end}
                        onChange={(e) => handleYearRangeChange('end', parseInt(e.target.value))}
                        className="w-20 border p-1 rounded"
                        min={yearRange.start}
                        max="2025"
                      />
                    </div>
                  ) : (
                    <div className="mt-2">
                      <input
                        type="number"
                        value={singleYear}
                        onChange={(e) => setSingleYear(parseInt(e.target.value))}
                        className="w-full border p-1 rounded"
                        min="1936"
                        max="2025"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button 
                      onClick={clearYearFilter}
                      className="text-[#663399] text-sm hover:underline"
                    >
                      Clear
                    </button>
                    <button className="bg-[#663399] text-white px-3 py-1 text-sm rounded hover:bg-[#552288]">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('publisher')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Publisher</span>
                {expandedSections.publisher ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.publisher && (
                <div className="space-y-2">
                  {publishers.map((pub) => (
                    <div key={pub.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={pub.name}
                        checked={selectedPublishers.has(pub.name)}
                        onChange={() => togglePublisher(pub.name)}
                        className="text-[#663399]"
                      />
                      <label htmlFor={pub.name} className="flex-1 text-sm">
                        {pub.name} ({pub.count})
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b pb-4">
              <button 
                onClick={() => toggleSection('topic')}
                className="w-full font-semibold mb-3 flex items-center justify-between hover:text-[#663399]"
              >
                <span>Topic</span>
                {expandedSections.topic ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {expandedSections.topic && (
                <div className="space-y-2">
                  {topics.map((topic) => (
                    <div key={topic.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={topic.name}
                        checked={selectedTopics.has(topic.name)}
                        onChange={() => toggleTopic(topic.name)}
                        className="text-[#663399]"
                      />
                      <label htmlFor={topic.name} className="flex-1 text-sm">
                        {topic.name} ({topic.count})
                      </label>
                    </div>
                  ))}
                  <button className="text-[#663399] text-sm hover:underline">Show More...</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceBrowser;