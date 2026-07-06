import { NextRequest, NextResponse } from "next/server";
import { BackendError, postDataScienceBackend } from "../_backend";

export const runtime = "nodejs";

interface UploadResponse {
  ok: boolean;
  table_name: string;
  row_count: number;
  columns: string[];
  data_source_id?: string;
  source?: unknown;
  s3?: unknown;
}

const MAX_UPLOAD_BYTES = 1_000_000;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "CSV file is required." }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "CSV file must be 1 MB or smaller for this demo route." }, { status: 400 });
    }

    const csvText = await file.text();
    const uploaded = await postDataScienceBackend<UploadResponse>("/api/csv/upload", {
      name: file.name.replace(/\.csv$/i, ""),
      csv_text: csvText,
    });

    return NextResponse.json({
      ok: true,
      data_source_id: uploaded.data_source_id || "demo_warehouse",
      source: uploaded.source,
      table_name: uploaded.table_name,
      row_count: uploaded.row_count,
      columns: uploaded.columns,
      s3: uploaded.s3,
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return NextResponse.json(
        {
          error: error.message,
          setup_required: error.setupRequired,
        },
        { status: error.status }
      );
    }
    console.error("Virtual data scientist upload bridge failed:", error);
    return NextResponse.json({ error: "Virtual data scientist upload bridge failed." }, { status: 500 });
  }
}
