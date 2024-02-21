import React, { useState, useRef, useEffect, useCallback } from "react";

const CustomSelect = ({
  name,
  label,
  labelStyle,
  minWidth,
  maxWidth,
  optionsMaxHeight,
  options,
  defaultValue,
  onChange,
}: {
  name: string;
  label: string;
  labelStyle?: "bold" | "underline" | "bold-underline";
  minWidth?: "auto" | number;
  maxWidth?: number;
  optionsMaxHeight?: "auto" | number;
  options: { value: string | number; label: string }[];
  defaultValue?: string;
  onChange?: (value: string | number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    defaultValue || ""
  );
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const selectRef = useRef<HTMLDivElement | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const styleLabel = {
    margin: 0,
    fontWeight:
      labelStyle === "bold" || labelStyle === "bold-underline"
        ? "bold"
        : "normal",
    textDecorationLine:
      labelStyle !== "bold" && labelStyle !== undefined ? "underline" : "unset",
    textDecorationThickness: labelStyle === "bold-underline" ? "2px" : "1px",
  };

  const styleWidth = {
    minWidth:
      minWidth === "auto" ? minWidth : minWidth ? `${minWidth}px` : "150px",
    maxWidth: maxWidth ? `${maxWidth}px` : "auto",
  };

  const styleMaxHeightOptions = {
    maxHeight:
      optionsMaxHeight === "auto"
        ? optionsMaxHeight
        : optionsMaxHeight
        ? `${optionsMaxHeight}px`
        : "150px",
  };

  useEffect(() => {
    const updatePosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        if (rect.top < 700) {
          setPosition({ top: rect.height, left: rect.left });
        } else {
          setPosition({ top: -150, left: rect.left });
          // Max-height del classname .options
        }
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);

    // return () => {
    //   window.removeEventListener("resize", updatePosition);
    // };
  }, []);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string | number) => {
    setSelectedValue(option);
    setIsOpen(false);

    if (onChange) {
      onChange(option);
    }
  };

  const handleDocumentClick = useCallback(
    (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        // Click fuera del componente, cierra el cuadro de opciones
        setIsOpen(false);
      }
    },
    [selectRef]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isOpen) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : options.length - 1
          );
          break;
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex < options.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "Enter":
          handleOptionClick(options[highlightedIndex]?.value || "");
          break;
        default:
          break;
      }
    } else {
      switch (event.key) {
        case "Enter":
          setIsOpen(true);
          break;
        case "ArrowDown":
          setIsOpen(true);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div
      className="custom-select"
      style={styleWidth}
      onClick={handleSelectClick}
      ref={selectRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="selected-value">
        <p style={styleLabel}>{`${label}`}</p>
        <p style={{ margin: "0 0 0 4px" }}>
          {options.find((option) => option.value === selectedValue)?.label}
        </p>
        <svg
          className={`arrow-icon ${isOpen ? "open" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      {isOpen && (
        <div className="options-container" style={{ top: position.top }}>
          <div
            className="options"
            style={{ ...styleMaxHeightOptions, overflowY: "auto" }}
          >
            {options.map((option, index) => (
              <div
                key={name + index}
                className={`test ${
                  highlightedIndex === index ? "highlighted" : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                <div key={option.value} className="option">
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
