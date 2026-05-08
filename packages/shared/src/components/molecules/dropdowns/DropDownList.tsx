// externals
import React, { forwardRef, RefObject, Ref, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// style
import css from "./DropDownList.module.css";

// utils
import { buildClassName } from "../../../utils/classNameBuilder";
import { usePrevious } from "../../common/usePreviousHook";

// components
import { SelectionField } from "../anchors/SelectionField";
import { ListPanel, ListPanelItem } from "../../atoms/panels/ListPanel";

// interfaces/types
import { ComponentWithForwardedRef } from "../../../types/reactHelperTypes";

export type DropDownListRefType = HTMLDivElement;

export type DropDownListType = ComponentWithForwardedRef<DropDownListProps>;

export interface DropDownListItem {
    id: string;
    value: string;
}

export interface DropDownListStateProps {
    className?: string;
    disabled?: boolean;
    labelText: string;
    listItems: DropDownListItem[];
    opened?: boolean;
    selectedId?: string | null;
    selectedValue?: string | null;
}

export interface DropDownListDispatchProps {
    onItemSelect?: { (itemId: string): void };
    onOpenedChange?: { (opened: boolean): void };
}

export type DropDownListProps = DropDownListStateProps & DropDownListDispatchProps;

// NOTE: Keep this private so that it isn't referenced outside this component
interface DropDownListInnerStateProps {
    innerRef: RefObject<DropDownListRefType>;
}

export const InnerDropDownList: React.FC<DropDownListProps & DropDownListInnerStateProps> = (props) => {
    const [opened, setOpened] = useState(props.opened ?? false);
    const [listStyle, setListStyle] = useState<React.CSSProperties>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const setRefs = (el: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        if (props.innerRef) {
            (props.innerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }
    };

    const prevProps = usePrevious({ opened: props.opened });
    useEffect(() => {
        if (prevProps?.opened !== props.opened) {
            if (opened !== props.opened) {
                setOpened(props.opened ?? false);
            }
        }
    }, [props.opened, opened]);

    const updateListPosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setListStyle({
                position: "fixed",
                top: rect.bottom,
                left: rect.left,
                width: rect.width,
                zIndex: 9999
            });
        }
    };

    useEffect(() => {
        if (opened) {
            updateListPosition();
            window.addEventListener("scroll", updateListPosition, true);
            window.addEventListener("resize", updateListPosition);
            return () => {
                window.removeEventListener("scroll", updateListPosition, true);
                window.removeEventListener("resize", updateListPosition);
            };
        }
    }, [opened]);

    const handleTriggerClick = () => {
        if (props.disabled) {
            return;
        }
        const newOpened = !opened;
        setOpened(newOpened);
        if (props.onOpenedChange) {
            props.onOpenedChange(newOpened);
        }
    };

    const handleItemSelect = (itemId: string) => {
        setOpened(false);
        if (props.onOpenedChange) {
            props.onOpenedChange(false);
        }
        if (props.onItemSelect) {
            props.onItemSelect(itemId);
        }
    };

    const listItems: ListPanelItem[] = props.listItems.map((item) => ({
        id: item.id,
        label: item.value
    }));

    const classToUse = buildClassName(css.container, props.className);

    const listPanel = opened
        ? createPortal(
              <div style={listStyle} className={css.listContainer}>
                  <ListPanel
                      items={listItems}
                      labelText=""
                      selectedItemId={props.selectedId ?? null}
                      disabled={props.disabled}
                      onItemSelect={handleItemSelect}
                  />
              </div>,
              document.body
          )
        : null;

    return (
        <div className={classToUse} ref={setRefs}>
            <SelectionField
                disabled={props.disabled}
                labelText={props.labelText}
                opened={opened}
                selectedText={props.selectedValue ?? null}
                onTriggerClick={handleTriggerClick}
            />
            {listPanel}
        </div>
    );
};

export const DropDownList: DropDownListType = forwardRef((props: DropDownListProps, ref: Ref<DropDownListRefType>) => (
    <InnerDropDownList innerRef={ref as RefObject<DropDownListRefType>} {...props} />
));
