import { NextResponse } from "next/server";
const baseUrl = "https://api.mapbox.com/search/searchbox/v1/suggest";
const apiKey = process.env.MAPBOX_ACCESS_TOKEN;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("q");
  const limit = 4;

  try {
    const res = await fetch(
      `${baseUrl}?q=${searchText}&language=en&limit=2&country=np&session_token=029efa9d-dd84-48f1-8925-11f394204bf0&access_token=${apiKey}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { Message: "Error fetching data" },
        { status: 401 }
      );
    }
    const dataJso = await res.json();
    console.log(dataJso);
    return NextResponse.json(dataJso);
  } catch (error) {}
}
