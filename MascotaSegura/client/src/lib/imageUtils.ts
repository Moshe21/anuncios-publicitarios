import { InsertPost } from "@shared/schema";

/**
 * Generates an image from the post data
 * @param postData The data for the social media post
 * @returns A promise that resolves to a URL of the generated image
 */
export const generateImage = async (postData: InsertPost): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Set canvas size
      canvas.width = 800;
      canvas.height = 1000;
      
      // Fill background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw header background
      ctx.fillStyle = '#2463EB';
      ctx.fillRect(0, 0, canvas.width, 100);
      
      // Draw header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(postData.apartmentName, 20, 55);
      
      // Draw "Aviso Importante" badge
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(canvas.width - 180, 30, 160, 40, 20);
      ctx.fill();
      
      ctx.fillStyle = '#2463EB';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Aviso Importante', canvas.width - 100, 55);
      
      // Load and draw the main image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Draw the image
        ctx.drawImage(img, 0, 100, canvas.width, 300);
        
        // Add gradient overlay on the image
        const gradient = ctx.createLinearGradient(0, 350, 0, 400);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 100, canvas.width, 300);
        
        // Add "Por la seguridad de todos" text over the image
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Por la seguridad de todos', 20, 380);
        
        // Draw the title
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(postData.title, 20, 440);
        
        // Draw the message
        ctx.fillStyle = '#1F2937';
        ctx.font = '18px Arial';
        
        // Wrap text for the message
        const maxWidth = canvas.width - 40;
        const words = postData.message.split(' ');
        let line = '';
        let y = 480;
        
        words.forEach(word => {
          const testLine = line + word + ' ';
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > maxWidth) {
            ctx.fillText(line, 20, y);
            line = word + ' ';
            y += 30;
          } else {
            line = testLine;
          }
        });
        ctx.fillText(line, 20, y);
        
        // Draw info box
        y += 50;
        ctx.fillStyle = '#F3F4F6';
        ctx.beginPath();
        ctx.roundRect(20, y, canvas.width - 40, 150, 10);
        ctx.fill();
        
        // Draw icons and text in the info box
        const infoItems = [
          { icon: '🐾', text: 'Por la seguridad de tu mascota, evita que se escape o lastime' },
          { icon: '❤️', text: 'Para proteger a niños y otros residentes de posibles incidentes' },
          { icon: '🏠', text: 'Las mascotas sueltas sin supervisión están prohibidas por reglamento' }
        ];
        
        infoItems.forEach((item, index) => {
          const infoY = y + 30 + (index * 40);
          ctx.fillStyle = '#1F2937';
          ctx.font = '24px Arial';
          ctx.fillText(item.icon, 40, infoY);
          
          ctx.font = '16px Arial';
          ctx.fillText(item.text, 80, infoY);
        });
        
        // Draw conclusion text
        y += 170;
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('¡Juntos hacemos de nuestro residencial un lugar mejor para todos!', 20, y);
        
        // Draw hashtags
        y += 40;
        let hashtagX = 20;
        
        postData.hashTags.forEach(tag => {
          const metrics = ctx.measureText(tag);
          
          if (hashtagX + metrics.width + 20 > canvas.width - 20) {
            hashtagX = 20;
            y += 40;
          }
          
          ctx.fillStyle = '#E5E7EB';
          ctx.beginPath();
          ctx.roundRect(hashtagX, y - 20, metrics.width + 20, 30, 15);
          ctx.fill();
          
          ctx.fillStyle = '#1F2937';
          ctx.font = '16px Arial';
          ctx.fillText(tag, hashtagX + 10, y);
          
          hashtagX += metrics.width + 30;
        });
        
        // Draw call to action box
        y += 50;
        ctx.fillStyle = 'rgba(36, 99, 235, 0.1)';
        ctx.beginPath();
        ctx.roundRect(20, y, canvas.width - 40, 80, 10);
        ctx.fill();
        
        ctx.fillStyle = '#2463EB';
        ctx.font = 'bold 18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Comparte este mensaje con tus vecinos', canvas.width / 2, y + 30);
        
        // Draw date and logo
        y += 100;
        ctx.fillStyle = '#1F2937';
        ctx.font = '16px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(postData.date, 20, y);
        
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#2463EB';
        ctx.fillText(postData.apartmentName, canvas.width - 20, y);
        
        // Convert canvas to URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = postData.imagePath;
      
    } catch (error) {
      reject(error);
    }
  });
};
