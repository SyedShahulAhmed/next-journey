"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { roomSchema } from "@/lib/validation";
import { roomService } from "@/services";
import { useChatStore } from "@/store";

const createRoomSchema = roomSchema;

type CreateRoomForm = z.infer<typeof createRoomSchema>;

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const { addRoom, setActiveRoom } = useChatStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
  });

  const onSubmit = async (values: CreateRoomForm) => {
    try {
      const room = await roomService.createRoom(values.name, values.description || "");
      addRoom(room);
      setActiveRoom(room.id);
      toast.success("Room created");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error((error as Error).message || "Unable to create room");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="subtle" size="sm" className="w-full justify-between">
          Create room
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New room</DialogTitle>
          <DialogDescription>Create a focused space for the next conversation.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Input placeholder="Room name" {...register("name")} />
            {errors.name ? (
              <p className="text-xs text-(--danger)">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Description (optional)"
              rows={3}
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-xs text-(--danger)">{errors.description.message}</p>
            ) : null}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create room"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
