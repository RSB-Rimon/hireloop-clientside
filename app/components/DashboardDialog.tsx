"use client"

import { Trash2, Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { JobListing } from "@/app/lib/api/jobs"
import { deleteJob } from "../lib/actions/jobs"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

export default  function  DeleteJobDialog({job,}: { job: Pick<JobListing, "_id">}) {
  const [open , setOpen] = useState(false);
  const router = useRouter();

  const  handleDelete = async () => {

    const res = await deleteJob(job._id)

    console.log("ID:",job._id, res,'deleting id form delete page');
    if(res.deletedCount){
      setOpen(false);
      toast.add({
        title : "Job Deleted",
        description :"The job has been permanently deleted."
      });
     router.refresh();
     
    }

  }

  return (
    <AlertDialog open= {open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <Trash2 className="size-3.5" aria-hidden="true" />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Job!</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this Job conversation. View{" "}
            <a href="#">Settings</a> delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
