import { fetchTrendingBooks } from "@/lib/actions/trending.action"

const TrendingPage = async () => {
  const result = await fetchTrendingBooks(); 
  console.log(result)
  return (
    <div>
      I am trending page
    </div>
  )
}

export default TrendingPage
