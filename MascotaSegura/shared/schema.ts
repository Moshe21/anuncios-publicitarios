import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the table for social media posts
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  apartmentName: text("apartment_name").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  imagePath: text("image_path").notNull(),
  date: text("date").notNull(),
  hashTags: text("hash_tags").array().notNull(),
});

// Define the schema for inserting posts
export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
});

// Export types
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// Default post data
export const defaultPost: InsertPost = {
  apartmentName: "Residencial Armonía",
  title: "No dejes a tu mascota suelta en áreas comunes",
  message: "Estimados residentes, les recordamos que está prohibido dejar a las mascotas sueltas sin supervisión en las áreas comunes. Por la seguridad de todos, incluyendo tu mascota, mantén siempre a tu mascota con correa y bajo tu control.",
  imagePath: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  date: new Date().toLocaleDateString('es', { month: 'long', year: 'numeric' }),
  hashTags: ["#MascotasResponsables", "#ComunidadSegura", "#MascotasConCorrea", "#NormasDeConvivencia"]
};

// Define image options
export const imageOptions = [
  {
    url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Perro con su propietario en un parque para mascotas"
  },
  {
    url: "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Perro feliz en el parque"
  },
  {
    url: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Dos perros con correa en el parque"
  },
  {
    url: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Gato en el interior de un hogar"
  }
];

// Users table definition (keeping the original table)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
