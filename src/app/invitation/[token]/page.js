import InvitationClient from "./InvitationClient";

export default async function Page({ params }) {
  const { token } = await params;

  return <InvitationClient token={token} />;
}
