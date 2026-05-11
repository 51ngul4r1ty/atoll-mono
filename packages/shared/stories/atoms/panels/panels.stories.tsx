/* eslint-disable security/detect-object-injection */
// externals
import * as React from "react";

// storybook
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";

// components
import {
    CalendarPanel,
    ItemMenuPanelCaretPosition,
    ItemMenuPanel,
    ListPanel,
    RemoveButton,
    DateOnly
} from "../../../dist/index.es";

// storybook
import { action } from "@storybook/addon-actions";

// common
import "../../storybook";

storiesOf("Atoms/Panels", module)
    .add("ItemMenuPanel (caret top-center)", () => (
        <ItemMenuPanel
            className="item-menu-panel caret-top-center"
            caretPosition={ItemMenuPanelCaretPosition.TopCenter}
            loading={boolean("loading", false)}
            onClose={() => {
                alert("close triggered");
            }}
        >
            <RemoveButton
                onClick={() => {
                    alert("remove clicked");
                }}
            />
        </ItemMenuPanel>
    ))
    .add("ItemMenuPanel (caret right-top)", () => (
        <ItemMenuPanel
            className="item-menu-panel caret-right-top"
            caretPosition={ItemMenuPanelCaretPosition.RightTop}
            loading={boolean("loading", false)}
            onClose={() => {
                alert("close triggered");
            }}
        >
            <RemoveButton
                onClick={() => {
                    alert("remove clicked");
                }}
            />
        </ItemMenuPanel>
    ))
    .add("CalendarPanel", () => (
        <CalendarPanel
            className="calendar-panel"
            dateSelected={new DateOnly(2021, 0, 5)}
            sprints={[
                {
                    start: new DateOnly(2020, 11, 22),
                    finish: new DateOnly(2021, 0, 4),
                    editing: false
                },
                {
                    start: new DateOnly(2021, 0, 5),
                    finish: new DateOnly(2021, 0, 18),
                    editing: true
                }
            ]}
            onDateClick={(date: any) => {
                alert(`${date} chosen`);
            }}
        ></CalendarPanel>
    ))
    .add("ListPanel", () => (
        <div className="storybook-form-background" style={{ width: "200px" }}>
            <ListPanel
                labelText="Choose an item"
                disabled={boolean("disabled", false)}
                items={[
                    { id: "item-1", label: "Backlog Item 1" },
                    { id: "item-2", label: "Backlog Item 2" },
                    { id: "item-3", label: "Backlog Item 3" },
                    { id: "item-4", label: "Backlog Item 4" },
                    { id: "item-5", label: "Backlog Item 5" },
                    { id: "item-6", label: "Backlog Item 6" },
                    { id: "item-7", label: "Backlog Item 7" },
                    { id: "item-8", label: "Backlog Item 8" }
                ]}
                selectedItemId="item-2"
                onItemSelect={action("item selected")}
            />
        </div>
    ));
