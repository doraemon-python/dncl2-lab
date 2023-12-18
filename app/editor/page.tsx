import EditorPageWrapper from "@/components/editor/layout/EditorPageWrapper";
import EditorHeader from "@/components/editor/layout/EditorHeader";
import EditorMain from "@/components/editor/layout/EditorMain";
import EditorBottomMenu from "@/components/editor/layout/EditorBottomMenu";

type Props = {
  searchParams?: {
    title: string;
  }
}

const Page = ({ searchParams }: Props) => {
  return (
    <EditorPageWrapper layoutId={searchParams?.title || "プログラム1"}>
      <EditorHeader />
      <EditorMain />
      {/* <EditorBottomMenu /> */}
    </EditorPageWrapper>
  );
}

export default Page;