import React, { Fragment } from "react";
import { Segment, Item, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import CaseListItem from "./CaseListItem";

export default observer(function CaseList() {
  const { caseStore } = useStore();
  const { caseRegistry } = caseStore;

  return (
    <>
      {Array.from(caseRegistry.values()).map((courtCase) => {
        return <CaseListItem key={courtCase.Id} courtCase={courtCase} />
      })}
    </>
  );
});
