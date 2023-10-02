import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { format } from "date-fns";
import { CourtCase, ICourtCase } from "../../../models/case";

interface Props {
  courtCase: ICourtCase;
}

export default function CaseListItem({ courtCase }: Props) {
  const { caseStore } = useStore();
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
  }

  console.log(courtCase);
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`#`}>
                {courtCase.Name}
              </Item.Header>
              <Item.Description>
                {courtCase.Description}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`#`}
          color="grey"
          floated="right"
          content="Pregled predmeta"
        />
      </Segment>
    </Segment.Group>
  );
}
