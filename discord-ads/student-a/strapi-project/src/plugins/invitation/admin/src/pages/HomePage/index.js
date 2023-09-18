/*
 *
 * HomePage
 *
 */

import React, {useState} from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import invitationRequest from "../../api/api/invitation";

import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

const HomePage = () => {
  const [link, setLink] = useState('')
  const fetchData = async () => {
    try {
      const invite = await invitationRequest.getUnusedInvite();
      console.log(invite);
      setLink(invite.link)
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div>
      <Layout>
        <BaseHeaderLayout
          onClick={fetchData}
          title="Fb / Google ads"
          subtitle="Click here."
          as="h2"
        />

        <BaseHeaderLayout
          onClick={fetchData}
          // title="Fb / Google ads"
          subtitle={link}
          as="h2"
        />
      </Layout>
    </div>
  );
};

export default HomePage;
