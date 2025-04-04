import { useState } from "react";
import { InsertPost, imageOptions } from "@shared/schema";
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PawPrint, Building, MessageSquare, Hash, Download, Save } from "lucide-react";
import { generateImage } from "@/lib/imageUtils";

interface PostEditorProps {
  postData: InsertPost;
  onUpdate: (data: Partial<InsertPost>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function PostEditor({ postData, onUpdate, onSave, isSaving }: PostEditorProps) {
  const [hashtagInput, setHashtagInput] = useState("");

  const handleAddHashtag = () => {
    if (hashtagInput.trim()) {
      let tag = hashtagInput.trim();
      // Ensure it has a hashtag prefix
      if (!tag.startsWith("#")) {
        tag = `#${tag}`;
      }
      // Remove spaces
      tag = tag.replace(/\s+/g, "");
      
      if (!postData.hashTags.includes(tag)) {
        onUpdate({ hashTags: [...postData.hashTags, tag] });
      }
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    onUpdate({ hashTags: postData.hashTags.filter(t => t !== tag) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddHashtag();
    }
  };

  const handleDownload = async () => {
    try {
      const imageUrl = await generateImage(postData);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `mascota-comunicado-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personaliza tu Aviso sobre Mascotas</CardTitle>
        <CardDescription>
          Edita los detalles para crear un comunicado efectivo sobre mascotas sueltas en áreas comunes
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Básico</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Mensaje</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" />
              <span className="hidden sm:inline">Imagen</span>
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              <span className="hidden sm:inline">Hashtags</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apartmentName">Nombre del Residencial</Label>
              <Input 
                id="apartmentName" 
                value={postData.apartmentName}
                onChange={(e) => onUpdate({ apartmentName: e.target.value })}
                placeholder="Ej. Residencial Armonía"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Título Principal</Label>
              <Input 
                id="title" 
                value={postData.title}
                onChange={(e) => onUpdate({ title: e.target.value })}
                placeholder="Ej. No dejes a tu mascota sin supervisión"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input 
                id="date" 
                value={postData.date}
                onChange={(e) => onUpdate({ date: e.target.value })}
                placeholder="Ej. Octubre 2023"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="message" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Mensaje Principal</Label>
              <Textarea 
                id="message" 
                value={postData.message}
                onChange={(e) => onUpdate({ message: e.target.value })}
                placeholder="Escribe aquí tu mensaje..."
                className="min-h-[120px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label>Selecciona una Imagen</Label>
              <div className="grid grid-cols-2 gap-3">
                {imageOptions.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                      postData.imagePath === image.url ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => onUpdate({ imagePath: image.url })}
                  >
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-32 object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hashtags" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hashtags">Agregar Hashtag</Label>
              <div className="flex gap-2">
                <Input 
                  id="hashtags" 
                  value={hashtagInput}
                  onChange={(e) => setHashtagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ej. CuidaTuMascota"
                />
                <Button 
                  onClick={handleAddHashtag}
                  type="button"
                >
                  Agregar
                </Button>
              </div>
            </div>
            
            <div>
              <Label>Hashtags Actuales</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {postData.hashTags.map((tag, index) => (
                  <div key={index} className="bg-neutral-200 px-3 py-1 rounded-full text-sm text-neutral-800 flex items-center gap-1">
                    {tag}
                    <button 
                      onClick={() => handleRemoveHashtag(tag)}
                      className="ml-1 text-neutral-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {postData.hashTags.length === 0 && (
                  <p className="text-neutral-500 text-sm">No hay hashtags. Agrega algunos para mayor visibilidad.</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button 
          className="w-full sm:w-auto"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? "Guardando..." : "Guardar Publicación"}
          <Save className="ml-2 h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto"
          onClick={handleDownload}
        >
          Descargar Imagen
          <Download className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
