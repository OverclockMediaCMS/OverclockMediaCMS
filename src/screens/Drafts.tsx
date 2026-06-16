import { useEffect, useState } from "react";
import type { Post, Media } from '../models'
import { useApi } from "../utilities/useApi";
import { PostDetailedDisplay, PostLimitedDisplay } from "../components/postComponents";
import { MediaLimitedDisplay } from "../components/mediaComponents";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../components/navigationComponents";
import { useGlobalContext } from "../GlobalContext";

type LocalPostDraft = Post & { type: 'post' };
type LocalMediaDraft = Media & { type: 'media'; isDraft: boolean };
type CombinedDraftItem = LocalPostDraft | LocalMediaDraft;

export function DraftsList() {
    const { getFromEndpoint } = useApi();
    const context = useGlobalContext();
    const [drafts, setDrafts] = useState<CombinedDraftItem[]>([]);
    const navigate = useNavigate();

    const fetchDraft = async () => {
        if(!context?.user?.id){
            console.warn("No user logged in!!");
            return;
        }

        const queryParams = {userId: context.user.id};

        let response = await getFromEndpoint("drafts", queryParams);
        let body = await response.json();
        setDrafts(body);
    };

    useEffect(() => {
        fetchDraft();
    }, [context?.user?.id]);

    return (
        <div style={{ padding: "20px" }}>
            {/* Back Button matching your exact page positioning framework */}
            <div style={{ justifyContent: 'flex-start', width: '10vh', marginBottom: "20px" }}>
                <BackButton />
            </div>

            <h2 style={{ marginBottom: "25px" }}>Draft Folders ({drafts.length})</h2>

            {drafts.length === 0 ? (
                <p>No active drafts found.</p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {drafts.map((draft) => {

                        // Render pathway for Post Drafts
                        if (draft.type === 'post') {
                            return (
                                <div key={`post-${draft.id}`} style={{ position: 'relative' }}>
                                    <PostLimitedDisplay
                                        id={draft.id}
                                        Title={draft.Title}
                                        Body={draft.Body}
                                        User={draft.User}
                                        isDraft={draft.isDraft}
                                        Tags={draft.Tags}
                                        Date={draft.Date}
                                        Comments={draft.Comments}
                                        onClick={() => navigate("/CreatePost", {state: { incomingDraft: draft }})}
                                    />
                                </div>
                            );
                        }

                        if (draft.type === 'media') {
                            return (
                                <div
                                    key={`media-${draft.id}`}
                                    onClick={() => navigate("/CreatePost", { state: { incomingDraft: draft }})}
                                    style={{ position: 'relative', cursor: 'pointer' }}
                                >
                                    <MediaLimitedDisplay
                                        id={draft.id}
                                        Title={draft.Title}
                                        FileExtension={draft.FileExtension}
                                        FilePath={draft.FilePath}
                                        Date={draft.Date}
                                        User={draft.User}
                                    />
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            )}
        </div>
    )
}