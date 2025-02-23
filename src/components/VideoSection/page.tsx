"use client";

import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PlayCircleIcon,
  XCircleIcon,
  Eye,
  Heart,
  Calendar,
  Clock,
  Bookmark,
  Maximize,
  Instagram as InstagramIcon,
} from "lucide-react";

// Types for Instagram API data
type InstagramVideo = {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  caption?: string;
  timestamp: string;
  like_count?: number;
  permalink?: string;
};

// Types for displayed video
type Video = {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  categories: string[];
  duration: string;
  likes: number;
  viewers: number;
  permalink?: string;
};

// Fungsi untuk menentukan kategori berdasarkan judul dan deskripsi
const determineCategories = (title: string, description: string): string[] => {
  const lowerTitle = title.toLowerCase();
  const lowerDescription = description.toLowerCase();
  const categories: string[] = [];

  if (lowerTitle.includes("amv") || lowerDescription.includes("amv")) {
    categories.push("AMV");
  }
  if (lowerTitle.includes("pmv") || lowerDescription.includes("pmv")) {
    categories.push("PMV");
  }
  if (lowerTitle.includes("gmv") || lowerDescription.includes("gmv")) {
    categories.push("GMV");
  }
  if (lowerTitle.includes("jedag") || lowerDescription.includes("jedag")) {
    categories.push("Jedag Jedug");
  }
  if (
    lowerTitle.includes("motiongraphic") ||
    lowerDescription.includes("motiongraphic")
  ) {
    categories.push("Motion Graphics");
  }
  if (
    lowerTitle.includes("tutorial") ||
    lowerDescription.includes("tutorial")
  ) {
    categories.push("Tutorials");
  }

  // Jika tidak ada kategori yang cocok, masukkan ke "Others"
  if (categories.length === 0) {
    categories.push("Others");
  }

  return categories;
};

const VideoSection = () => {
  const videoSectionRef = useRef(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeVideoData, setActiveVideoData] = useState<Video | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,like_count,permalink&access_token=IGAAIhyXao7wlBZAE1nM2tkUUwzVmd6Y2ZADVTdSUDJnd3prNG1PWFlxbHZAOM040cU01TldndGJxTk9nRGNKYVB3UkZABOWhKa21tQWVyWl9ibk8wS3pCX0FwU0ZA2bV9uZAE8zV18xTzcwUFJCa3gtcGREX2JtRWNESGRhVG52SHN2bwZDZD`
        );
        const data = await response.json();

        const enhancedData = data.data
          .filter((item: InstagramVideo) => item.media_type === "VIDEO")
          .slice(0, 6)
          .map((item: InstagramVideo) => ({
            title: item.caption || "No Title",
            description: item.caption || "No Description",
            videoUrl: item.media_url,
            thumbnailUrl: item.thumbnail_url || item.media_url,
            uploadDate: new Date(item.timestamp).toLocaleDateString(),
            categories: determineCategories(
              item.caption || "",
              item.caption || ""
            ), // Gunakan fungsi determineCategories
            duration: "3:24",
            likes: item.like_count || 0,
            viewers: item.like_count ? item.like_count * 10 : 1000, // Perkiraan viewers berdasarkan likes
            permalink: item.permalink || "#",
          }));

        setVideos(enhancedData);
      } catch (error) {
        console.error("Error fetching videos from Instagram:", error);
      }
    };

    fetchVideos();
  }, []);

  const closeModal = () => {
    setSelectedVideo(null);
    setPlaying(false);
    setActiveVideoData(null);
  };

  const playVideo = (video: Video) => {
    setSelectedVideo(video.videoUrl);
    setActiveVideoData(video);
    setPlaying(true);
  };

  return (
    <section
      ref={videoSectionRef}
      id="edits"
      className="py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #1a1a1a 0%, #0d0d0d 50%, #000000 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white text-center mb-12 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Latest <span className="text-purple-400">Edits</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="sync">
            {videos.map((video, index) => (
              <motion.div
                key={`${video.title}-${index}`}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Thumbnail Video */}
                <motion.div
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer mb-4"
                  onClick={() => playVideo(video)}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 15px 30px -10px rgba(138, 75, 255, 0.3)",
                  }}
                >
                  {/* Tag Kategori */}
                  <div className="absolute top-2 left-2 flex gap-2 z-10">
                    {video.categories.map((category, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs font-semibold rounded-md ${
                          category === "AMV"
                            ? "bg-blue-500"
                            : category === "PMV"
                            ? "bg-purple-500"
                            : category === "GMV"
                            ? "bg-green-500"
                            : category === "Jedag Jedug"
                            ? "bg-red-500"
                            : category === "Motion Graphics"
                            ? "bg-yellow-500"
                            : category === "Tutorials"
                            ? "bg-indigo-500"
                            : "bg-gray-500" // Default untuk "Others"
                        } text-white`}
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <motion.img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-xl"
                    animate={{
                      scale: hoveredIndex === index ? 1.08 : 1,
                      filter:
                        hoveredIndex === index
                          ? "brightness(0.7)"
                          : "brightness(1)",
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Overlay Play saat hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 group-hover:opacity-100 transition-all"
                    animate={{
                      backgroundColor:
                        hoveredIndex === index
                          ? "rgba(0, 0, 0, 0.3)"
                          : "rgba(0, 0, 0, 0)",
                    }}
                  >
                    <motion.div
                      className="bg-purple-600/80 rounded-full p-4 flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <PlayCircleIcon size={30} className="text-white" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                <div className="flex justify-between items-center text-white text-sm font-semibold mt-1">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye size={18} />
                    <span>{video.viewers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-500">
                    <Heart size={18} fill="currentColor" />
                    <span>{video.likes.toLocaleString()}</span>
                  </div>
                </div>

                {/* Judul Video */}
                <motion.h3
                  className="text-lg font-medium mt-2 line-clamp-1"
                  animate={{
                    color: hoveredIndex === index ? "#d8b4fe" : "#ffffff",
                  }}
                >
                  {video.title}
                </motion.h3>

                {/* Deskripsi Video */}
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {video.description}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link
            href="/videos"
            className="group w-full sm:w-auto relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-lg text-white text-center font-medium font-sans"
          >
            <span className="relative z-10">View All Edits</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl mx-4 max-h-screen overflow-y-auto custom-scroll"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video player */}
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <ReactPlayer
                  url={selectedVideo}
                  width="100%"
                  height="100%"
                  playing={playing}
                  controls
                  className="aspect-video"
                />
              </div>

              {/* Video information */}
              {activeVideoData && (
                <motion.div className="mt-6 p-6 bg-gray-900/60 backdrop-blur-md rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {activeVideoData.title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        {/* Tampilkan semua kategori */}
                        {activeVideoData.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-purple-900/40 rounded-md text-purple-300"
                          >
                            {category}
                          </span>
                        ))}
                        {/* Format tanggal */}
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(
                            activeVideoData.uploadDate
                          ).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    {/* Tombol close modal */}
                    <motion.button
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                    >
                      <XCircleIcon size={24} />
                    </motion.button>
                  </div>

                  {/* Deskripsi */}
                  <p className="mt-4 text-gray-300">
                    {activeVideoData.description}
                  </p>

                  {/* Tombol View on Instagram */}
                  {activeVideoData.permalink && (
                    <a
                      href={activeVideoData.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-sans rounded-lg hover:opacity-90 transition"
                    >
                      <InstagramIcon size={20} /> View on Instagram
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoSection;
