"use client";

import { merge } from "lodash";
import { PropsWithChildren, forwardRef, useMemo } from "react";

import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import useMediaQuery from "@mui/material/useMediaQuery";

// import DefaultErrorBoundary from "./DefaultErrorBoundary";
import ModalHeader, { ModalHeaderStyle } from "./ModalHeader";

export type ModelStyleType = "default" | "bottom" | "alert";

export interface ModalPropsType {
  title?: string;
  show: boolean;
  onClose: () => void;
  onBack?: () => void;
  panelClassName?: string;
  /**
   * default: fullscreen under 1024px
   *
   * bottom: bottom modal under 1024px
   *
   * alert: blurred background, no header
   */
  modalStyle?: ModelStyleType;
  headerStyle?: ModalHeaderStyle;
  contentClassName?: string;
  canBack?: boolean;
  maxWidth?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({
  title,
  show,
  onClose,
  onBack,
  children,
  panelClassName = "",
  modalStyle = "default",
  headerStyle,
  contentClassName = "",
  canBack,
  maxWidth = "500px",
}: PropsWithChildren<ModalPropsType>) => {
  const theme = useTheme();
  const isUnderMd = useMediaQuery(theme.breakpoints.down(768));
  const dialogProps = useMemo(() => {
    let props: any = {
      fullWidth: true,
    };
    let additionalProps = {};
    if (!isUnderMd) {
      const desktopProps = {
        PaperProps: {
          style: {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            maxWidth,
            width: "fit-content",
            height: "fit-content",
          },
        },
        BackdropProps: {
          style: {
            backgroundColor: "rgba(16, 16, 16, 0.12)",
            backdropFilter: "blur(2px)",
          },
        },
      };
      props = merge(props, desktopProps);
    }
    switch (modalStyle) {
      case "default":
        additionalProps = {
          fullScreen: isUnderMd,
        };
        break;
      case "bottom":
        if (isUnderMd) {
          additionalProps = {
            PaperProps: {
              style: {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                margin: 0,
                width: "100%",
                maxWidth: "100%",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                maxHeight: "calc(100% - 20px)",
              },
            },
            TransitionComponent: Transition,
          };
        }
        break;
      case "alert":
        additionalProps = {
          PaperProps: {
            style: {
              width: "calc(100% - 104px)",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
            },
          },
          BackdropProps: {
            style: {
              backgroundColor: "rgba(16, 16, 16, 0.12)",
              backdropFilter: "blur(2px)",
            },
          },
        };
        break;
      default:
        break;
    }

    return merge(props, additionalProps);
  }, [modalStyle, isUnderMd]);

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      {...dialogProps}
      // base-Modal-hidden={true}
    >
      <div className="flex h-full w-full flex-col overflow-y-auto bg-white md:min-w-[30rem]">
        {modalStyle !== "alert" && (
          <ModalHeader
            title={title}
            onClose={onClose}
            onBack={onBack}
            headerStyle={headerStyle}
            canBack={canBack}
          />
        )}

        {/* scrollable parent, avoid padding top */}
        <div className="h-full max-h-full overflow-y-auto">
          {/* set padding here */}
          <div className="flex-1 p-6">{children}</div>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
