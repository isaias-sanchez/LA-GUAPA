
import React from "react";
import { Timeline } from "./ui/Timeline";
import { useConfig } from "../contexts/ConfigContext";
import { HistoryPost } from "../types";

export function StoryJourney() {
  const { config, updateConfig } = useConfig();

  const handleReaction = (postId: string, type: 'like' | 'dislike') => {
    const updatedPosts = config.historyPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            likes: type === 'like' ? post.reactions.likes + 1 : post.reactions.likes,
            dislikes: type === 'dislike' ? post.reactions.dislikes + 1 : post.reactions.dislikes,
          }
        };
      }
      return post;
    });
    updateConfig({ historyPosts: updatedPosts });
  };

  const transformData = (posts: HistoryPost[]) => {
    return posts.map(post => ({
      title: post.title,
      content: (
        <div className="font-body">
          <p className="text-secondary dark:text-neutral-200 text-lg font-hand mb-6 italic leading-tight whitespace-pre-wrap">
            {post.content}
          </p>

          {post.imageUrl && (
            <div className="mb-6 rotate-1 hover:rotate-0 transition-transform duration-300">
              {post.mediaType === 'video' ? (
                <video
                  src={post.imageUrl}
                  className="rounded-lg object-cover h-48 w-full shadow-heavy border-2 border-black"
                  controls
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={post.imageUrl}
                  className="rounded-lg object-cover h-48 w-full shadow-heavy border-2 border-black grayscale hover:grayscale-0 transition-all"
                  alt={post.title}
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 border-t-2 border-black/10 pt-4">
            <div className="flex gap-4">
              <button
                onClick={() => handleReaction(post.id, 'like')}
                className="flex items-center gap-2 font-punk text-sm hover:text-green-600 transition-colors group"
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">thumb_up</span>
                <span>{post.reactions.likes}</span>
              </button>
              <button
                onClick={() => handleReaction(post.id, 'dislike')}
                className="flex items-center gap-2 font-punk text-sm hover:text-red-600 transition-colors group"
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">thumb_down</span>
                <span>{post.reactions.dislikes}</span>
              </button>
            </div>
            {post.isNews && <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 font-bold uppercase tracking-widest">NUEVO</span>}
          </div>
        </div>
      )
    }));
  };

  return (
    <div className="min-h-screen w-full bg-accent pb-20">
      <Timeline data={transformData(config.historyPosts)} />
    </div>
  );
}
