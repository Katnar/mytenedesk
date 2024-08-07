import { Cell } from "@tanstack/react-table";
import { ReactNode } from "preact/compat";
import { RegisterOptions } from "react-hook-form";

export interface iSelectable {
  id: string;
  value: string;
}

export type tDependancyArray = { key: string; value: string }[] | string[];
export type tConditionType = "VISIBILITY" | "ENABILITY";

export type fieldTypes =
  | "SELECT"
  | "TEXT_FIELD"
  | "DATE"
  | "MULTI_SELECT"
  | "BUTTON"
  | "STICKY_DYNAMIC"
  | "TITLE"
  | "SECTIONED"
  | "DYNAMIC_LIST"
  | "FILE";

interface iFieldButton {
  title: string;
  width?: number; // must be between 1 to 12
  onAction: (fieldValue: any) => void;
}
export type fieldDefaultValueType =
  | string
  | Date
  | iSelectable
  | iSelectable[]
  | { [key: string]: iSelectable[] }
  | { [key: string]: iSelectable[] }[];

interface iBasicField {
  id: string;
  title: string;
  fieldType: fieldTypes;
  width?: number; // must be between 1 to 12
  button?: iFieldButton;
  dependsOn?: string | string[]; // a key of which buttons have only one depedenecy
  registerOptions?: RegisterOptions;
  unvisibleWhen?: tDependancyArray;
  visibleWhen?: tDependancyArray;
  disabledWhen?: tDependancyArray;
  enabledWhen?: tDependancyArray;
  disabledWhenNext?: string;
  disabled?: boolean;
  visible?: boolean;
  defaultValue?: fieldDefaultValueType;
  group?: string;
}

export interface iSectionedField extends iBasicField {
  secondaryTitle: string;
  fieldsUnderSection: iField[];
}

export interface iTextField extends iBasicField {
  inputType: "number" | "text" | "date";
}

export interface fieldOccursAt {
  localId: string;
  localValue: string;
}

export interface setFieldChangeAt {
  toChangeId: string;
  toChangeNewValue: string;
}

export interface iSelectField extends iBasicField {
  // triggers custom form setting values when that field changes. note: it can also detect changes from other fields that will trigger when the local field's value changes
  whenValueChangesSet?: {
    when: {
      and?: fieldOccursAt[];
      or?: fieldOccursAt[];
    };
    set: setFieldChangeAt[];
    onChangeSet?: () => void;
  }[];
  options?: iSelectable[] | { [key: string]: iSelectable[] };
  derivedOptions?: string;
  whenValueChanges?: {
    value: string;
    onChange: () => void;
  };
  blockValueSelection?: {
    value: string;
    onBlockedChange?: () => void;
  }[];
  lockOnSelect?: boolean;
  onLockWhenNoValue?: () => void;
  onDeleteField?: () => void;
}

export interface iMultipleSelectField extends iSelectField {}

export interface iDynamicListField extends iBasicField {
  filterSelections?: string[]; // removes selected options from the list of options
  fields: iField[];
  onUnvisible?: () => void;
  onNoDependantVisibleWhen?: () => void;
  lockOn?: string;
  blockDuplicationsOf?: {
    id: string;
    onSelection?: () => void;
  };
}

export interface iStickyDynamicField extends iBasicField {
  fields: iDynamicListField[];
}

export interface iFileField extends iBasicField {}

export type iField =
  | iTextField
  | iSelectField
  | iDynamicListField
  | iFileField
  | iSectionedField;

export interface iNavItem {
  text: string;
  to?: string;
  Modal?: ReactNode;
  Icon: any;
  permission?: Array<string>;
}

export interface iNavSection {
  text: string;
  items: iNavItem[];
  permission?: Array<string>;
}
export interface iNavSection {
  text: string;
  items: iNavItem[];
}
export type CacheHook<T> = {
  cacheValue: T;
  updateCache: (value: T) => void;
  invalidateCache: () => void;
};

interface iTableColumn<T> {
  header?: string;
  accessorKey?: string;
  id: string;
  type: "Date" | "String" | "Custom" | "Meta" | "Function";
  cell?: (cell: Cell<T, unknown>) => ReactNode | ReactNode[];
}
export type FactoryFunction<T> = () => T;

export interface iStringTableColumn<T> extends iTableColumn<T> {
  filterFn?: (cellValue: any, valueFromFilter: any) => boolean;
}

export interface iFunctionTableColumn<T> extends iTableColumn<T> {
  accessorFn: (row: T) => string;
}

export interface iDateTableColumn<T> extends iTableColumn<T> {
  filterFn?: (cellValue: Date, valueFromFilter: Date) => boolean;
}

export interface iCustomTableColumn<T> extends Omit<iTableColumn<T>, "cell"> {
  parser?: (objects: any[]) => string[]; // transfers the object into a readable string for globalFilter
  cell: (items: string[]) => ReactNode[] | ReactNode;
  filterFn?: (items: string[], valueFromFilter: any) => boolean;
  sortFn?: (items: string[]) => number;
}

// a column to always be hidden, to exist only when searching for values
export interface iMetaTableColumn<T> extends iTableColumn<T> {
  accessorFn: (row: T) => string;
  filterFn: (cellValue: string, valueFromFilter: string) => boolean;
}

export type ColumnsType<T> =
  | iCustomTableColumn<T>
  | iDateTableColumn<T>
  | iStringTableColumn<T>
  | iMetaTableColumn<T>
  | iFunctionTableColumn<T>;

type tFlterField = "TOGGLE" | "MULTISELECT" | "DATE" | "RADIO" | "DATE_RANGE";

export interface iDateChangeProps {
  date: Date;
  type: "BIGGER_THAN" | "LESS_THAN";
  includingSelf: boolean;
}

interface iBasicFilter {
  title: string;
  id: string;
  options: iSelectable[] | Record<string, iSelectable[]>;
  type: tFlterField;
  dependsOn?: string;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  enabledWhen?: tDependancyArray;
  disabledWhen?: tDependancyArray;
  visibleWhen?: tDependancyArray;
  unvisibleWhen?: tDependancyArray;
  defaultValues?: iSelectable[];
}

export interface iRadioFilter extends iBasicFilter {
  flexDirection?: "row" | "column";
  defaultValue?: iSelectable;
  onClick: (newFilterState: iSelectable) => void;
}

export interface iToggleFilter extends iBasicFilter {
  selectAll?: boolean;
  flexDirection?: "row" | "column";
  onClick: (newFilterState: iSelectable[]) => void;
}

export interface iMultiSelectFilter extends iBasicFilter {
  onChange: (newFilterState: { id: string; value: iSelectable[] }) => void;
}

export interface iDateFilter extends iBasicFilter {
  onChange: (selectedDate: Date) => void;
}

export interface iSliderField extends iBasicField {
  steps: number;
  defaultRange: [number, number];
  minDistance: number;
}

export type modalToastType = "error" | "warning" | "info" | "success";

export interface iDateFilterRange extends iBasicFilter {
  onChange: (startDate: Date | null, endDate: Date | null) => void;
}

export type iFilter =
  | iToggleFilter
  | iMultiSelectFilter
  | iDateFilter
  | iDateFilterRange;

export type iMagadData = Record<
  string,
  {
    title: string;
    items: Record<
      string,
      {
        title: string;
        trueCount: number;
        falseCount: number;
        lastUpdateDate: Date;
      }
    >;
  }
>;

export interface iRequestResult<T> {
  data?: T;
  error_message?: string;
  error: boolean;
}

export type optionsSelect = {
  id: string | number;
  value: string | number;
};

export type User = {
  _id: string;
  role: string;
  permission?: "צפייה ועריכה" | "צפייה" | string;
  firstName: string;
  lastName: string;
  personalnumber: string;
  center?: string | null;
  centers?: Array<any> | undefined;
  arena?: string | null;
  arenas?: Array<any> | undefined;
  approved: boolean | string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type reserveType = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
  firstName: String;
  lastName: String;
  personalNumber: String;
  personalId: String;
  rank?: String;
  serviceType?: String;
  frame?: Object;
  registerUnit?: Object;
  center: Object;
  hativa: Object;
  occupation?: Object;
  occupations?: Array<any> | undefined;
  hativas?: Array<any> | undefined;
  centers?: Array<any> | undefined;
  plugaCode?: String;
  manningType?: String;
  dailDate?: Date | string;
  mainStatus?: String;
  subStatus?: String;
  shamap?: Boolean | String;
  isAppended?: String | Boolean;
  presetDate?: Date;
  releaseDate?: Date;
  centerRef?: String;
  centerNotes?: String;
  arenaNotes?: String;
  isValid?: Boolean | String;
  isDisconnected?: Boolean | String;
  absentee?: Boolean | String;
  welfare?: String;
};

export type arenaType = {
  _id?: string;
  name: string;
  units?: Array<string> | string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type environmentType = {
  _id?: string;
  name: string;
  reality: number | string;
  code: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type registerUnitType = {
  _id?: string;
  name: string;
  hativaId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type hativaType = {
  _id?: string;
  name: string;
  centerId?: string;
  registerunits?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type centerType = {
  _id?: string;
  name: string;
  hativas?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type UnitBank = {
  centers: centerType[];
  hativas: hativaType[];
  registerunits: registerUnitType[];
};
