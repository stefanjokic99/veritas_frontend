import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import CaseList from "./CaseList";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";
import CaseFilters from "./ActivityFilters";

export default observer(function CaseDashboard() {
  const { caseStore } = useStore();
  const { loadCases, caseRegistry } = caseStore;

  useEffect(() => {
    if(caseRegistry.size <= 1) loadCases();
  }, [loadCases, caseRegistry.size]);

  if (caseStore.loadingInitial) return <LoadingComponent content="Učitavanje slučajeva..." />;


  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <CaseList />
        </Grid.Column>
        <Grid.Column width="6">
          <CaseFilters />
        </Grid.Column>
      </Grid>
    </>
  );
})
