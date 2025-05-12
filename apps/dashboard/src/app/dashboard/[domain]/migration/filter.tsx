"use client";

import { useEffect } from "react";
import FormSelect from "@/components/controls/form-select";
import { Icons } from "@/components/icons";
import { Menu } from "@/components/menu";
import { useEffectAfterMount } from "@/components/use-effect-after-mount";
import { useForm } from "react-hook-form";

import { Form } from "@school-clerk/ui/form";

import { cookieChanged } from "./cookie";

interface Props {
  terms?: string[];
  classes?: string[];
  config?;
}
export function Filter({ config, classes, terms }: Props) {
  const __filters = [
    {
      label: "View",
      cookieKey: "view",
      options: ["all students", "student session record"],
      prefix: "View: ",
      suffix: "",
    },
  ];
  return (
    <div className="flex min-w-max max-w-sm justify-end gap-4">
      {__filters.map((f) => (
        <Menu
          key={f.label}
          Icon={Icons.Filter}
          label={
            config?.[f.cookieKey]
              ? `${f.prefix}${config?.[f.cookieKey]} ${f.suffix}`
              : f.label
          }
        >
          {f.options.map((o, i) => (
            <Menu.Item
              key={i}
              onClick={(e) => {
                cookieChanged({
                  ...config,
                  [f.cookieKey]: o,
                });
              }}
            >
              {o}
            </Menu.Item>
          ))}
        </Menu>
      ))}
      <Menu
        Icon={Icons.Filter}
        label={config?.term ? `${config?.term} term` : " select term"}
      >
        <Menu.Item
          onClick={(e) => {
            cookieChanged({
              ...config,
              term: null,
            });
          }}
        >
          All
        </Menu.Item>
        {terms.map((c) => (
          <Menu.Item
            onClick={(e) => {
              cookieChanged({
                ...config,
                term: c,
              });
            }}
            key={c}
          >
            {c}
          </Menu.Item>
        ))}
      </Menu>
      <Menu
        label={config?.class ? `${config?.class}` : " select class"}
        Icon={Icons.Filter}
      >
        <Menu.Item
          onClick={(e) => {
            cookieChanged({
              ...config,
              class: null,
            });
          }}
        >
          All
        </Menu.Item>
        {classes.map((c) => (
          <Menu.Item
            onClick={(e) => {
              cookieChanged({
                ...config,
                class: c,
              });
            }}
            key={c}
          >
            {c}
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
