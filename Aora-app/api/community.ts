import { useAuth } from "@/components/AuthContext";
import { CommnunityType } from "@/types/types";
import { baseUrl } from "@/utils/urls";
import axios from "axios";

export const addCommunityToDB = async (community: CommnunityType) => {
    const URL = baseUrl + 'api/community/create'
    try {
        const response = await axios.post(URL, { ...community })
        return (response.status === 201 ? response.data : null)
    } catch (error) {
        return null
    }
}

export const addMemberToDB = async (communityCode: string) => {
    const URL = baseUrl + 'api/community/addMember'
    try {
        const response = await axios.post(URL, { communityCode })
console.log(response);

        if (response.status === 200) {
            const { user, setUser } = useAuth()
            const { community,
                communityExpenses,
                communityCategories,
                communityBudgets } = response.data
            setUser({
                ...user,
                communities: [...user.communities,community],
                communitiesExpenses: [...user.communitiesExpenses, communityExpenses],
                communitiesCategories: [...user.communitiesCategories, communityCategories],
                communitiesBudgets: [...user.communitiesBudgets, communityBudgets]
            })
            return {joined: true, communityName: community.name}
        } else {
            return {joined: false, communityName: ''}
        }
    } catch (error) {
        return {joined: false, communityName: ''}
    }
}
