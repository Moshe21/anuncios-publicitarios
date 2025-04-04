import { InsertPost } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { SocialShare } from "./SocialShare";
import { PawPrint, Heart, Home } from "lucide-react";

interface PostPreviewProps {
  postData: InsertPost;
}

export function PostPreview({ postData }: PostPreviewProps) {
  return (
    <Card className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl">
      {/* Header with apartment branding */}
      <div className="bg-primary text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">{postData.apartmentName}</h1>
        </div>
        <div className="text-sm font-medium rounded-full bg-white text-primary px-3 py-1">
          Aviso Importante
        </div>
      </div>
      
      {/* Main content */}
      <div className="p-5">
        {/* Image section */}
        <div className="rounded-lg overflow-hidden mb-5 relative">
          <img 
            src={postData.imagePath} 
            alt="Mascota en comunidad" 
            className="w-full h-64 object-cover" 
          />
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white font-bold text-xl">Por la seguridad de todos</h2>
          </div>
        </div>
        
        {/* Message content */}
        <div className="mb-6">
          <h2 className="font-bold text-2xl text-neutral-800 mb-3">{postData.title}</h2>
          
          <p className="text-neutral-800 mb-4">
            {postData.message}
          </p>
          
          <div className="bg-neutral-100 p-4 rounded-lg mb-4">
            <div className="flex items-start space-x-3 mb-3">
              <PawPrint className="text-amber-500 mt-1 h-5 w-5" />
              <p className="text-sm">Por la seguridad de tu mascota, evita que se escape o lastime</p>
            </div>
            <div className="flex items-start space-x-3 mb-3">
              <Heart className="text-pink-500 mt-1 h-5 w-5" />
              <p className="text-sm">Para proteger a niños y otros residentes de posibles incidentes</p>
            </div>
            <div className="flex items-start space-x-3">
              <Home className="text-primary mt-1 h-5 w-5" />
              <p className="text-sm">Las mascotas sueltas sin supervisión están prohibidas por reglamento</p>
            </div>
          </div>
          
          <p className="text-neutral-800 font-semibold">
            ¡Juntos hacemos de nuestro residencial un lugar mejor para todos!
          </p>
        </div>
        
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {postData.hashTags.map((tag, index) => (
            <span key={index} className="bg-neutral-200 px-3 py-1 rounded-full text-sm text-neutral-800">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <p className="text-primary font-medium text-center mb-2">
            Comparte este mensaje con tus vecinos
          </p>
          
          <SocialShare postData={postData} />
        </div>
        
        {/* Date & Logo */}
        <div className="flex justify-between items-center text-sm text-neutral-800">
          <span>{postData.date}</span>
          <span className="font-bold text-primary">{postData.apartmentName}</span>
        </div>
      </div>
    </Card>
  );
}
