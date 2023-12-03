import Grid from "@/components/Grid";
import GridController from "@/components/GridController";
import Legend from "@/components/Legend";

export default function Home() {
  return (
    <>
      <GridController />
      <div className="flex flex-row gap-4 mt-[2rem] mx-auto">
        <Grid isWeightToggled={false} />

        <Legend />
      </div>
    </>
  );
}
