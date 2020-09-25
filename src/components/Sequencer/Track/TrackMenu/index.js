import React from "react";
import { ToggleLayer } from "react-laag";
// import ResizeObserver from "resize-observer-polyfill";

import Button from "./Button";
import composeRefs from "./composeRefs";
import Menu, { MenuItem } from "./Menu";

export const PopoverMenu = React.forwardRef(function PopoverMenu(props, ref) {
  return (
    <ToggleLayer
      // ResizeObserver={ResizeObserver}
      renderLayer={(props) => {
        function handleClick(item) {
          return function onClick() {
            alert(`You clicked on "${item}"`);
            props.close();
          };
        }

        return props.isOpen ? (
          <Menu
            ref={props.layerProps.ref}
            style={props.layerProps.style}
            arrowStyle={props.arrowStyle}
            layerSide={props.layerSide}
          >
            <MenuItem onClick={handleClick("Item 1")}>Item 1</MenuItem>
            <MenuItem onClick={handleClick("Item 2")}>Item 2</MenuItem>
            <MenuItem onClick={handleClick("Item 3")}>Item 3</MenuItem>
            <MenuItem onClick={handleClick("Item 4")}>Item 4</MenuItem>
          </Menu>
        ) : null;
      }}
      closeOnOutsideClick
      closeOnDisappear="partial"
      placement={{
        anchor: "BOTTOM_CENTER",
        autoAdjust: true,
        snapToAnchor: false,
        triggerOffset: 12,
        scrollOffset: 16,
        preferX: "RIGHT"
      }}
    >
      {({ isOpen, triggerRef, toggle }) => (
        <Button
          ref={composeRefs(triggerRef, ref)}
          onClick={toggle}
          style={props.style}
        >
          {isOpen ? "Hide" : "Show"}
        </Button>
      )}
    </ToggleLayer>
  );
});


