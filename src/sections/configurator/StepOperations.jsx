import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Field } from "@/components/ui/forms/Field";
import { Fieldset } from "@/components/ui/forms/Fieldset";
import { Checkbox } from "@/components/ui/forms/Checkbox";
import { NumberStepper } from "@/components/ui/forms/NumberStepper";
import { featureAreaOrder } from "@/data/feature-order";
import { capabilityStates, AVAILABILITY } from "@/data/feature-states";
import { LIMITS } from "@/lib/configurator/constants";

// TODO(Debass): the V3 notes mention "teams and priorities" without approved wording; they are not built.

/**
 * Step 2: How do you work? (Operations).
 *
 * @param {Object} props
 * @param {Object} props.data - Configurator state
 * @param {(name: string, id: string) => void} props.toggleIn - Toggle array item callback
 * @param {(partial: Object) => void} props.patch - State patch callback
 */
export function StepOperations({ data, toggleIn, patch }) {
  const { t } = useTranslation();

  const visibleAreas = useMemo(
    () =>
      featureAreaOrder.filter(
        (key) => capabilityStates[key] !== AVAILABILITY.HIDDEN,
      ),
    [],
  );

  const selectedFunctions = data.functions || [];

  return (
    <div>
      <h2 className="font-display text-h2 text-heading" tabIndex={-1}>
        {t("configurator:steps.operations")}
      </h2>

      <div className="mt-8 space-y-10">
        {/* Group A: Capabilities */}
        <Fieldset
          legend={t("configurator:operations.operateTitle")}
          hint={t("configurator:operations.operateHelper")}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {visibleAreas.map((areaKey) => (
              <Checkbox
                key={areaKey}
                id={`func-${areaKey}`}
                label={t(`features:areas.${areaKey}.name`)}
                checked={selectedFunctions.includes(areaKey)}
                onChange={() => toggleIn("functions", areaKey)}
              />
            ))}
          </div>
        </Fieldset>

        {/* Group B: Size & Capacity */}
        <Fieldset
          legend={t("configurator:operations.sizeTitle")}
          hint={t("configurator:operations.sizeHelper")}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="config-users" label={t("pricing:page.usersLabel")}>
              <NumberStepper
                id="config-users"
                value={data.users}
                min={LIMITS.users.min}
                max={LIMITS.users.max}
                onChange={(val) => patch({ users: val })}
              />
            </Field>

            <Field id="config-entities" label={t("pricing:page.entitiesLabel")}>
              <NumberStepper
                id="config-entities"
                value={data.entities}
                min={LIMITS.entities.min}
                max={LIMITS.entities.max}
                onChange={(val) => patch({ entities: val })}
              />
            </Field>
          </div>
        </Fieldset>
      </div>
    </div>
  );
}
