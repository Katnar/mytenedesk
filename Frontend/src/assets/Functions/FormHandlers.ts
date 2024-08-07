import { UseFormGetValues, UseFormReturn, useWatch } from "react-hook-form";
import { iField, tConditionType } from "../../interfaces";

export const getFullDependantId = (field: iField, parent?: string) => {
  const result: string[] = [];

  if (field.dependsOn) {
    if (Array.isArray(field.dependsOn)) {
      field.dependsOn.forEach((dependency) => {
        if (typeof dependency === "string") {
          if (dependency.startsWith("$ROOT.")) {
            result.push(dependency.replace("$ROOT.", ""));
          } else {
            result.push(parent ? `${parent}.${dependency}` : dependency);
          }
        }
      });
    } else if (typeof field.dependsOn === "string") {
      if (field.dependsOn.startsWith("$ROOT.")) {
        result.push(field.dependsOn.replace("$ROOT.", ""));
      } else {
        result.push(parent ? `${parent}.${field.dependsOn}` : field.dependsOn);
      }
    }
  }

  return result.length > 0 ? result : undefined;
};

export const getFullFieldId = (field: iField, parent?: string) =>
  parent ? `${parent}.${field.id}` : field.id;
export const getFullDisabledWhenNext = (field: iField, parent?: string) =>
  parent ? `${parent}.${field.disabledWhenNext}` : field.disabledWhenNext;

export const getFullPath = (originalPath: string, parent?: string): string => {
  if (originalPath.startsWith("$ROOT.")) {
    return originalPath.replace("$ROOT.", "");
  } else {
    return parent ? `${parent}.${originalPath}` : originalPath;
  }
};

export const getDynamicIds = (
  field: iField,
  key: string,
  form: UseFormReturn,
  parent?: string,
) => {
  const dynamicProperty = (field[key as keyof iField] as any[]) || undefined;
  if (!dynamicProperty || dynamicProperty.length === 0) {
    return [];
  }

  return dynamicProperty
    .map((item) => {
      if (typeof item === "object" && item.key) {
        // this is an array and we need to handle it - first the array itself and then every property in the array
        if (item.key.includes("$")) {
          let [fieldId, idInField] = item.key.split("$.");
          fieldId = getFullPath(fieldId, parent);
          const values = form.getValues(fieldId);
          const items = [fieldId];
          if (values) {
            for (let i = 0; i < values.length; i++)
              items.push(fieldId + "." + i + "." + idInField);
          }

          return items;
        }
        return getFullPath(item.key, parent);
      } else if (typeof item === "string") {
        return getFullPath(item, parent);
      }

      // Handle unexpected types (if any)
      return "";
    })
    .flat();
};

export const checkValue = (
  field: { key: string; value: string } | string,
  getValues: UseFormGetValues<any>,
  parent?: string,
) => {
  if (typeof field === "string") {
    return getValues(getFullPath(field, parent));
  } else {
    if (field.key.includes(".")) {
      let [fieldId, idInField] = field.key.split("$.");
      fieldId = getFullPath(fieldId, parent);
      const values = getValues(fieldId);

      return values
        ? values.some((item) => item[idInField] === field.value)
        : undefined;
    } else return getValues(getFullPath(field.key, parent)) === field.value;
  }
};

export const isFieldConditionMet = (
  type: tConditionType,
  field: iField,
  getValues: UseFormGetValues<any>,
  parent?: string,
) => {
  if (type === "VISIBILITY") {
    if (!field.unvisibleWhen && !field.visibleWhen) {
      // if field has no dependencies than we can just always display it
      return true;
    }
    if (field.visibleWhen) {
      // if at least one is true - than the object is to be displayed
      return field.visibleWhen.some((field) =>
        checkValue(field, getValues, parent),
      );
    } else {
      // we need at least one condition to be false and then we dont display it
      return !field.unvisibleWhen!.some((field) =>
        checkValue(field, getValues, parent),
      );
    }
  } else {
    if (!(field.enabledWhen || field.disabledWhen)) {
      // if field has no dependencied it will always be enabled
      return true;
    }
    if (field.enabledWhen) {
      return field.enabledWhen.some((field) =>
        checkValue(field, getValues, parent),
      );
    } else {
      return !field.disabledWhen!.some((field) =>
        checkValue(field, getValues, parent),
      );
    }
  }
};

export const registerDependencies = (
  field: iField,
  form: UseFormReturn,
  parent?: string,
) => {
  const dependencies = [
    "visibleWhen",
    "unvisibleWhen",
    "enabledWhen",
    "disabledWhen",
  ];
  let dependencyList = dependencies
    .map((fieldKey) => {
      if (!field[fieldKey as keyof iField]) return [];
      return getDynamicIds(field, fieldKey, form, parent);
    })
    .flat();

  if (field.derivedOptions) {
    dependencyList.push(field.derivedOptions.split("$.")[0]);
  }
  if (field.dependsOn) {
    const dependencies = getFullDependantId(field, parent) as string | string[];
    dependencyList.push(
      ...(Array.isArray(dependencies) ? dependencies : [dependencies]),
    );
  }

  if (dependencyList.length > 0) {
    dependencyList = Array.from(new Set(dependencyList)).filter(Boolean);
    return useWatch({
      name: dependencyList,
      control: form.control,
      exact: true,
    });
  }
};

export const calculateWidth = (field: iField): number => {
  const fieldWidth = field.width || 12;
  const buttonWidth = field.button ? field.button.width! : 12;

  return fieldWidth + (field.button ? buttonWidth : 0);
};
