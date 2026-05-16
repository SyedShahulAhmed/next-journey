import { connectDb } from "@/lib/db";
import Url from "@/models/Url";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    shortCode: string;
  }>;
}

export default async function RedirectPage({
  params,
}: Props) {
  await connectDb();

  const { shortCode } = await params;

  const normalizedShortCode =
    shortCode.toLowerCase();

  const url = await Url.findOne({
    shortCode: normalizedShortCode,
  });

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
        Link Not Found
      </div>
    );
  }

  await Url.findByIdAndUpdate(url._id, {
    $inc: { clicks: 1 },
    lastVisited: new Date(),
  });

  redirect(url.originalUrl);
}