import { RiCloseLine } from "react-icons/ri";

export type ModalHeaderStyle = "default" | "transparent" | "nav" | "hide";

interface Props {
  title?: string;
  onClose?: () => void;
  onBack?: () => void;
  headerStyle?: ModalHeaderStyle;
  canBack?: boolean;
}

const ModalHeader = ({
  title = "",
  onClose,
  headerStyle = "default",
  canBack,
  onBack,
}: Props) => {
  if (headerStyle === "hide") {
    return null;
  }

  return (
    <>
      {headerStyle === "default" && (
        <>
          <div className="relative mx-6 flex shrink-0 grow-0 flex-nowrap items-center justify-between border-b pt-5 pb-4 text-lg font-semibold text-black">
            <button
              type="button"
              className="size-7 absolute left-0 flex items-center justify-center rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              <RiCloseLine className="size-7" />
            </button>
            <div className="text-lg min-h-7 flex-1 text-center">{title}</div>
          </div>
        </>
      )}
      {headerStyle === "transparent" && (
        <button
          type="button"
          className="absolute left-6 top-6 z-[500] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-white text-xl font-semibold text-gray-400 shadow-[0px_0px_2px_rgba(0,0,0,0.25)]"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
        >
          <RiCloseLine className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default ModalHeader;
