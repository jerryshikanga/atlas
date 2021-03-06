import React from "react";
import { Link } from "react-router";
import { Query } from "react-apollo";
import styled from "@emotion/styled";
import { Settings } from "@material-ui/icons";

import Address from "../components/Address";
import colors from "../colors";
import IconLink from "../components/IconLink";
import PageLoader from "./PageLoader";
import SuperuserOnly from "../components/SuperuserOnly";
import { LIST_OFFICES_QUERY } from "../queries";

const OfficeListContainer = styled.section`
  li {
    display: block;
    margin-bottom: 1rem;
  }
  ul {
    margin: 1rem 0;
    padding: 0;
  }
`;

export default function OfficeList() {
  return (
    <Query query={LIST_OFFICES_QUERY}>
      {({ loading, error, data }) => {
        if (error) throw error;
        if (loading) return <PageLoader />;
        const { offices } = data;
        return (
          <OfficeListContainer>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th width={100}>People</th>
                  <SuperuserOnly>
                    <th width={50} />
                  </SuperuserOnly>
                </tr>
              </thead>
              <tbody>
                {offices.map(o => (
                  <tr key={o.id}>
                    <td>
                      <div>
                        <Link to={`/offices/${o.externalId}`}>{o.name}</Link>
                      </div>
                      <small>
                        <Address office={o} />
                      </small>
                    </td>
                    <td>{o.numPeople.toLocaleString()}</td>
                    <SuperuserOnly>
                      <td>
                        <IconLink
                          icon={<Settings />}
                          to={`/offices/${o.externalId}/update`}
                          color={colors.linkText}
                          style={{ fontSize: "0.9em" }}
                        />
                      </td>
                    </SuperuserOnly>
                  </tr>
                ))}
              </tbody>
            </table>
          </OfficeListContainer>
        );
      }}
    </Query>
  );
}
