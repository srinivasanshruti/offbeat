import axios from 'axios';

export type ArticleResponse = {
  id: number
  title: string
  description: string
  image: string
  image_alt_text: string
  category_primary: string
  category_secondary: string
  link: string
  pub_date: string
  source_id: number
  source_name: string
}

export type TopicResponse = {
  category: string
  count: number
}

export type SourceResponse = {
  id: number
  source_name: string
  source_url: string
  source_logo: string
}

export class Api {

  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getArticles(sourceId?: number): Promise<ArticleResponse[]> {
    return await this.#get(`articles?sourceId=${sourceId || ''}`);
  }

  async getArticlesByIds(articleIds: number[]): Promise<ArticleResponse[]> {
    return await this.#post('articles', articleIds);
  }

  async getTopics(): Promise<TopicResponse[]> {
    return await this.#get('topics');
  }

  async getSources(): Promise<SourceResponse[]> {
    return await this.#get('sources');
  }

  async #post(endpoint: string, body: number[]) {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const resp = await axios.post(url, body);
      return resp.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async #get(endpoint: string) {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const resp = await axios.get(url);
      return resp.data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
}
