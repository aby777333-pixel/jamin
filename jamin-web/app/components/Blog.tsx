"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "./data";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function Blog() {
  return (
    <section id="blog" className="section-py bg-[#FDFAF5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-['Cinzel'] text-xs tracking-[0.3em] text-[#F5A623] uppercase">
            Land Investment Insights
          </p>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 text-center font-['Cormorant_Garamond'] text-4xl font-semibold text-[#1A1412] md:text-5xl"
        >
          Expert Knowledge. Real Returns.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-center font-['Outfit'] text-lg text-[#8A8078]"
        >
          Stay ahead with India&apos;s most trusted land investment blog
        </motion.p>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white"
            >
              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                {/* Category & Read Time */}
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#FFF0F0] px-3 py-1 font-['Outfit'] text-xs font-medium text-[#D42B2B]">
                    {post.category}
                  </span>
                  <span className="font-['Outfit'] text-xs text-[#8A8078]">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-['Cormorant_Garamond'] text-xl font-semibold text-[#1A1412] transition-colors group-hover:text-[#D42B2B]">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 flex-1 font-['Outfit'] text-sm text-[#8A8078] line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-[#E8E0D0] pt-4">
                  <span className="font-['Outfit'] text-xs text-[#8A8078]">
                    {post.date}
                  </span>
                  <a
                    href="#"
                    className="flex items-center gap-1 font-['Outfit'] text-sm font-medium text-[#D42B2B] transition-colors group-hover:gap-2"
                  >
                    Read Article
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
