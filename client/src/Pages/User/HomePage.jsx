import React, { useEffect, useState } from "react";
import Tile from "../../Components/Tile";
import Corousal from "../../Components/Corousal";
import { useGet } from "../../hooks/apiRequests";
import { useAuth } from "../../Context/AuthContext";

const HomePage = () => {
  const [stats, setStats] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, catRes] = await Promise.all([
        useGet("/stats", user?.token),
        useGet("/category", user?.token)
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (catRes.success) setCategories(catRes.data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [user?.token]);

  return (
    <div id="container">
      <div id="banner-section" className="hero-banner">
        <div className="banner-content">
          <h1 className="text-gradient">Find Your New Best Friend</h1>
          <p>Connecting wonderful pets with loving forever homes. Browse our shops and categories to start your journey.</p>
        </div>
        <div id="banner-image">
          <img src={"home-page.jpg"} alt="Happy Pets" />
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <Tile key={index} count={stat.count} name={stat.name} />
        ))}
      </div>

      <div className="category-section">
        <h2 id="heading-secondary">Explore Categories</h2>
        {isLoading ? (
          <div className="loading-state">Loading categories...</div>
        ) : (
          <Corousal categories={categories} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
