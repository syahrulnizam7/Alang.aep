"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircleIcon,
  XCircleIcon,
  Calendar,
  Eye,
  Heart,
  Instagram as InstagramIcon,
} from "lucide-react";
import ReactPlayer from "react-player";
import Navbar from "@/components/Navbar/page";
import SkeletonLoading from "@/components/SkeletonLoading/page";

interface Video {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  categories: string[];
  uploadDate: string;
  duration: string;
  likes: number;
  viewers: number;
  permalink: string;
}

// Mock categories for filtering
const categories = [
  "All",
  "AMV",
  "PMV",
  "GMV",
  "Jedag Jedug",
  "Motion Graphics",
  "Tutorials",
  "Others",
];

// Warna untuk setiap kategori
const categoryColors: { [key: string]: string } = {
  AMV: "bg-blue-500",
  PMV: "bg-purple-500",
  GMV: "bg-green-500",
  "Jedag Jedug": "bg-red-500",
  "Motion Graphics": "bg-yellow-500",
  Tutorials: "bg-indigo-500",
  Others: "bg-gray-500",
};

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

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [nextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false); // State untuk filtering
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activeVideoData, setActiveVideoData] = useState<Video | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalVideos, setTotalVideos] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  } | null>(null);

  // Fetch all videos
  const fetchAllVideos = useCallback(async () => {
    setIsLoading(true);
    setVideos([]);
    setTotalVideos(null);
    setCategoryCounts(null);

    let allVideos: Video[] = [];

    // Masukkan Access Token masing-masing akun
    const ACCESS_TOKEN_1 =
      "IGAAIhyXao7wlBZAE1DeU1IS1VDRlZAyUzFjOHRyLXdndU1maW5kQ3JMRDFaX2ZAYUUlqQ0czbTRBTndMUkJ4NktQb3pOa29oa21mMVprQzlNSGdnN0RwRFIyZA0hrWjc3UmtycGRGRFB5ZAHE2bGpUZAk1ZAWWpwdEdyajZAaUGlxdWFyWQZDZD";
    const ACCESS_TOKEN_2 =
      "IGAAIhyXao7wlBZAE5hTW5nRTlnMnVPLXdMR1FNczlRTzl4aXFhWFdLaGxkRGdtM1daejBFRF9HYTdjODM5bXVyME5RNERncmFyT1JHcHFaS2VNZAkthcXdYUzI1cUFBQ3VzRU4tS0JfOTE0YW9sUUtnVi1fX0lsd0h5aXlxT1htUQZDZD";

    // URL untuk kedua akun
    const baseUrl1 = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,like_count,permalink&access_token=${ACCESS_TOKEN_1}`;
    const baseUrl2 = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp,like_count,permalink&access_token=${ACCESS_TOKEN_2}`;

    // Fungsi untuk mengambil semua media dari satu akun dengan pagination
    const fetchAllFromAccount = async (url: string) => {
      let media: any[] = [];
      let nextUrl: string | null = url;

      try {
        while (nextUrl) {
          const response = await fetch(nextUrl);
          const data: { data?: any[]; paging?: { next?: string } } =
            await response.json();
          if (data.data) {
            // **Filter hanya video**
            const videoMedia = data.data.filter(
              (item: any) => item.media_type === "VIDEO"
            );
            media = [...media, ...videoMedia]; // Tambahkan hasil ke array utama
          }
          nextUrl = data.paging?.next || null; // Jika ada next page, update URL, jika tidak hentikan loop
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      return media;
    };

    try {
      // Fetch semua video dari kedua akun
      const [data1, data2] = await Promise.all([
        fetchAllFromAccount(baseUrl1),
        fetchAllFromAccount(baseUrl2),
      ]);

      // Format data agar seragam
      const formatData = (data: any) =>
        data.map((item: any) => ({
          title: item.caption || "No Title",
          description: item.caption || "No Description",
          videoUrl: item.media_url,
          thumbnailUrl: item.thumbnail_url || item.media_url,
          categories: determineCategories(
            item.caption || "",
            item.caption || ""
          ),
          uploadDate: item.timestamp,
          duration: "0:00",
          likes: item.like_count || 0,
          viewers: Math.floor(Math.random() * 10000) + 1000,
          permalink: item.permalink || "#",
        }));

      // Gabungkan data dari kedua akun
      allVideos = [...formatData(data1), ...formatData(data2)];

      // Hitung total video
      setTotalVideos(allVideos.length);

      // Hitung jumlah video per kategori
      const counts: { [key: string]: number } = {};
      categories.forEach((category) => (counts[category] = 0));

      allVideos.forEach((video) => {
        video.categories.forEach((category) => {
          if (counts[category] !== undefined) {
            counts[category]++;
          }
        });
      });

      setCategoryCounts(counts);
      setVideos(allVideos);
    } catch (error) {
      console.error("Error fetching all videos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch videos on component mount
  useEffect(() => {
    fetchAllVideos();
  }, [fetchAllVideos]);

  useEffect(() => {
    const filterVideos = async () => {
      setIsFiltering(true); // Mulai proses filtering

      // Tambahkan penundaan buatan untuk memastikan animasi loading terlihat
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (activeCategory === "All") {
        setFilteredVideos(videos);
      } else {
        setFilteredVideos(
          videos.filter((video) => video.categories.includes(activeCategory))
        );
      }

      setIsFiltering(false);
    };

    filterVideos();
  }, [activeCategory, videos]);

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
    <motion.section
      className="bg-black text-white min-h-screen"
      ref={containerRef}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-8 py-24">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-purple-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">Videos</span>
        </div>

        {/* Category Filters with Count */}
        <div className="mb-16">
          <motion.h2 className="text-3xl font-bold mb-2">
            Browse Categories
          </motion.h2>
          {/* Total Videos */}
          <div className="flex text-lg font-bold text-slate-400 mb-6">
            Total Videos:
            {isLoading ? (
              <div className="ml-2 animate-spin h-5 w-5 border-4 border-gray-300 border-t-purple-500 rounded-full "></div>
            ) : (
              `  ${totalVideos}`
            )}
          </div>
          <motion.div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category)}
              >
                {category}{" "}
                {isLoading ? (
                  <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-purple-500 rounded-full"></span>
                ) : (
                  category !== "All" && `(${categoryCounts?.[category] ?? 0})`
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Loading animation */}
        {(isLoading || isFiltering) && <SkeletonLoading />}

        {/* Videos grid */}
        {!isLoading && !isFiltering && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="sync">
              {filteredVideos.map((video, index) => (
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
                            categoryColors[category] || "bg-gray-500"
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
                      <span>{video.viewers?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-500">
                      <Heart size={18} fill="currentColor" />
                      <span>{video.likes?.toLocaleString()}</span>
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
        )}

        {/* Tombol Load More
        {nextCursor && (
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium text-white transition-all transform hover:scale-105 active:scale-95"
              onClick={() => !isLoading && fetchAllVideos()}
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.05 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
            >
              {isLoading ? "Loading..." : "Load More"}
            </motion.button>
          </motion.div>
        )} */}

        {/* Pesan jika tidak ada data lagi */}
        {!nextCursor && !isLoading && (
          <div className="text-center text-gray-400 mt-8">
            No more videos to load.
          </div>
        )}
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
                  className="aspect-video "
                />
              </div>

              {/* Video information */}
              {activeVideoData && (
                <motion.div className="mt-6 p-6 bg-gray-900/60 backdrop-blur-md rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">
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
    </motion.section>
  );
}
