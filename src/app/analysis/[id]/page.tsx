import AnalysisContent from "@/components/analysis/AnalysisContent";

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AnalysisContent resumeId={id} />;
}
