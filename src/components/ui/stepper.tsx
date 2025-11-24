"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type StepperContextValue = {
  value: number;
  setValue: (v: number) => void;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);
const StepperItemContext = React.createContext<{ step: number } | null>(null);

function useStepper() {
  const ctx = React.useContext(StepperContext);
  if (!ctx) throw new Error("Stepper components must be used within <Stepper>");
  return ctx;
}

interface StepperProps extends React.ComponentProps<"div"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

function Stepper({
  value,
  defaultValue = 1,
  onValueChange,
  className,
  children,
  ...props
}: StepperProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? (value as number) : internal;

  const setValue = (v: number) => {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <StepperContext.Provider value={{ value: current, setValue }}>
      <div
        data-slot="stepper"
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    </StepperContext.Provider>
  );
}

interface StepperItemProps extends React.ComponentProps<"div"> {
  step: number;
}

function StepperItem({ step, className, children, ...props }: StepperItemProps) {
  const { value } = useStepper();
  const state: "completed" | "current" | "upcoming" =
    step < value ? "completed" : step === value ? "current" : "upcoming";

  return (
    <StepperItemContext.Provider value={{ step }}>
      <div
        data-slot="stepper-item"
        data-state={state}
        data-step={step}
        className={cn("flex items-center", className)}
        {...props}
      >
        {children}
      </div>
    </StepperItemContext.Provider>
  );
}

function StepperTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  const { setValue } = useStepper();
  const item = React.useContext(StepperItemContext);
  return (
    <button
      type="button"
      data-slot="stepper-trigger"
      className={cn("flex items-center", className)}
      onClick={() => (item ? setValue(item.step) : undefined)}
      {...props}
    >
      {children}
    </button>
  );
}

function StepperIndicator({ className, ...props }: React.ComponentProps<"div">) {
  const { value } = useStepper();
  const item = React.useContext(StepperItemContext);
  const step = item?.step ?? 0;
  const state: "completed" | "current" | "upcoming" =
    step < value ? "completed" : step === value ? "current" : "upcoming";

  const base = "flex items-center justify-center rounded-full border transition-all shrink-0 aspect-square";
  const styles =
    state === "current"
      ? "bg-accent-purple text-white border-accent-purple shadow-md"
      : state === "completed"
      ? "bg-secondary-background text-primary-text border-border-gray"
      : "bg-primary-background text-secondary-text border-border-gray";

  return (
    <div
      data-slot="stepper-indicator"
      data-state={state}
      className={cn("size-9", base, styles, className)}
      {...props}
    >
      <span className="text-sm font-medium">{step}</span>
    </div>
  );
}

function StepperTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-title"
      className={cn("text-primary-text font-medium", className)}
      {...props}
    />
  );
}

function StepperDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-description"
      className={cn("text-secondary-text text-sm", className)}
      {...props}
    />
  );
}

function StepperSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      data-slot="stepper-separator"
      className={cn("h-px flex-1 bg-border-gray", className)}
      {...props}
    />
  );
}

// Utility: attach step attribute via wrapper for stepper item
function StepperItemWithAttr({ step, ...props }: StepperItemProps) {
  return <StepperItem step={step} {...props} data-step={step} />;
}

export {
  Stepper,
  StepperItemWithAttr as StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
};