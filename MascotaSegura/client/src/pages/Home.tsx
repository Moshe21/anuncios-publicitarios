import { useState } from "react";
import { PostEditor } from "@/components/PostEditor";
import { PostPreview } from "@/components/PostPreview";
import { defaultPost, InsertPost } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [postData, setPostData] = useState<InsertPost>(defaultPost);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      const response = await apiRequest("POST", "/api/posts", data);
      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Publicación guardada",
        description: "Tu publicación ha sido guardada exitosamente",
        duration: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "No se pudo guardar la publicación",
        variant: "destructive",
        duration: 3000,
      });
    },
  });

  const handleSave = () => {
    saveMutation.mutate(postData);
  };

  const handleUpdate = (newData: Partial<InsertPost>) => {
    setPostData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-neutral-800">
          Crear Aviso: No Dejar Mascotas Sueltas en Áreas Comunes
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <PostEditor 
              postData={postData} 
              onUpdate={handleUpdate} 
              onSave={handleSave}
              isSaving={saveMutation.isPending}
            />
          </div>
          <div className="order-1 md:order-2">
            <PostPreview postData={postData} />
          </div>
        </div>
      </div>
    </div>
  );
}
