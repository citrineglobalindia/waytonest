import { useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon, Upload } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  useGalleryImages,
  useCreateGalleryImage,
  useUpdateGalleryImage,
  useDeleteGalleryImage,
  uploadGalleryImage,
} from "@/hooks/useGallery";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type GalleryImage = Database["public"]["Tables"]["gallery_images"]["Row"];

const emptyForm = {
  title: "",
  description: "",
  image_url: "",
  category: "General",
  display_order: 0,
  is_active: true,
};

const AdminGallery = () => {
  const { data: images, isLoading } = useGalleryImages(false);
  const createImage = useCreateGalleryImage();
  const updateImage = useUpdateGalleryImage();
  const deleteImage = useDeleteGalleryImage();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditing(null);
  };

  const handleOpenDialog = (image?: GalleryImage) => {
    if (image) {
      setEditing(image);
      setFormData({
        title: image.title || "",
        description: image.description || "",
        image_url: image.image_url,
        category: image.category,
        display_order: image.display_order,
        is_active: image.is_active,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadGalleryImage(file);
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast.success("Image uploaded");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast.error("Please upload an image or paste an image URL");
      return;
    }
    try {
      if (editing) {
        await updateImage.mutateAsync({ id: editing.id, ...formData });
        toast.success("Gallery image updated");
      } else {
        await createImage.mutateAsync(formData);
        toast.success("Gallery image added");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save gallery image");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      await deleteImage.mutateAsync(id);
      toast.success("Gallery image deleted");
    } catch (error) {
      toast.error("Failed to delete gallery image");
    }
  };

  return (
    <AdminLayout title="Gallery">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">Manage the images shown on the public gallery page</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Image" : "Add Image"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label>Image *</Label>
                  <div className="mt-1 space-y-2">
                    <label className="flex items-center justify-center gap-2 h-24 rounded-lg border border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploading ? "Uploading..." : "Click to upload image"}
                      </span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                    <Input
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="or paste an image URL"
                    />
                    {formData.image_url && (
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label>Title</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Projects, Events, Site Visits"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full" disabled={uploading}>
                  {editing ? "Update Image" : "Add Image"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !images || images.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <ImageIcon className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No gallery images yet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="bg-card border border-border/50 rounded-xl overflow-hidden">
                <img src={image.image_url} alt={image.title || "Gallery image"} className="w-full h-40 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">{image.title || "Untitled"}</p>
                      <p className="text-xs text-muted-foreground">{image.category}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        image.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {image.is_active ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="outline" onClick={() => handleOpenDialog(image)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(image.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
