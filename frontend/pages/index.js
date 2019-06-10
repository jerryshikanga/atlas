import React from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import moment from "moment";
import Link from "next/link";

import initialize from "../utils/initialize";
import ErrorMessage from "../components/ErrorMessage";
import Layout from "../components/Layout";
import PersonLink from "../components/PersonLink";
import { LIST_PEOPLE_QUERY } from "../components/PeopleList";

const Index = () => (
  <Layout title="Home">
    <h1>Welcome to Atlas</h1>
    <p>Atlas is your map to Sentry.</p>
    <p>
      We could probably put the newest hires here? Anniversaries? Birthdays?
    </p>
    <h2>Newest Sentries</h2>
    <Query
      query={LIST_PEOPLE_QUERY}
      variables={{
        limit: 5,
        dateStartedAfter: moment()
          .subtract(1, "months")
          .format("YYYY-MM-DD"),
        orderBy: "dateStarted"
      }}
    >
      {({ loading, error, data }) => {
        if (error) return <ErrorMessage message="Error loading people." />;
        if (loading) return <div>Loading</div>;
        const { users } = data;
        if (!users.length) {
          return (
            <p>
              {`It looks like there's been no newly added teammates in the last
              month.`}
            </p>
          );
        }
        return (
          <ul>
            {users.map(p => (
              <li key={p.id}>
                <PersonLink user={p} />
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
    <h2>Explore</h2>
    <p>
      Here are some pages CKJ needs to figure out where to place links to...
    </p>
    <ul>
      <li>
        <Link prefetch href="/people">
          <a>/people</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/offices">
          <a>/offices</a>
        </Link>
      </li>
      <li>
        <Link prefetch href="/orgChart">
          <a>/orgChart</a>
        </Link>
      </li>
    </ul>
  </Layout>
);

Index.getInitialProps = function(ctx) {
  initialize(ctx);
};

export default connect(state => state)(Index);
