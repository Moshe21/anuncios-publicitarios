import { InsertPost } from "@shared/schema";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { Icons } from "./Icons";

interface SocialShareProps {
  postData: InsertPost;
}

export function SocialShare({ postData }: SocialShareProps) {
  const hashtagStr = postData.hashTags.join(' ');
  const messageBasic = `${postData.apartmentName}: ${postData.title}`;
  const messageComplete = `${messageBasic} - ${postData.message.slice(0, 50)}... ${hashtagStr}`;
  
  const message = encodeURIComponent(messageBasic);
  const messageWithHashtags = encodeURIComponent(messageComplete);
  const whatsappMessage = encodeURIComponent(`📢 *${postData.title}*\n\n${postData.message}\n\n${hashtagStr}`);
  const url = encodeURIComponent(window.location.href);

  const shareOnPlatform = (platform: string) => {
    let shareUrl = '';
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${messageWithHashtags}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${whatsappMessage}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex justify-center space-x-3">
      <button 
        className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"
        onClick={() => shareOnPlatform('facebook')}
        aria-label="Compartir en Facebook"
      >
        <Facebook className="h-5 w-5" />
      </button>
      <button 
        className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"
        onClick={() => shareOnPlatform('twitter')}
        aria-label="Compartir en Twitter"
      >
        <Twitter className="h-5 w-5" />
      </button>
      <button 
        className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"
        onClick={() => shareOnPlatform('whatsapp')}
        aria-label="Compartir en WhatsApp"
      >
        <Icons.WhatsApp className="h-5 w-5" />
      </button>
      <button 
        className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:bg-opacity-90 transition-all"
        onClick={() => shareOnPlatform('linkedin')}
        aria-label="Compartir en LinkedIn"
      >
        <Linkedin className="h-5 w-5" />
      </button>
    </div>
  );
}
