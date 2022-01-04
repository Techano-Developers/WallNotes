import { Request } from 'express'
import Pagination, { PaginationI } from '../types/pagination.types'
import '../services/string.services'


/**
 * Request Service
 * @return {void}
 */
export default class RequestService {
    private req: Request

    /**
     * add more methods to express request
     * @param {Express.Request} req
     */
    constructor(req: Request) {
        this.req = req
    }

    /**
     * Create new instance from RequestService
     * @param {Express.Request} req
     * @return {RequestService}
     */
    public static newInstance(req: Request) {
        return new RequestService(req)
    }

    /**
     * Get pagination value form express request
     * @param {Express.Request} req
     * @param {Pagination|PaginationI} pagination
     * @return {Pagination}
     */
    public static pagination(req: Request, pagination: PaginationI = {
        page: 1,
        countPerPage: 10,
    }): Pagination {
        return RequestService.newInstance(req).pagination(pagination)
    }

    /**
     * get pagination value from request
     * @param {Pagination|PaginationI} pagination
     * @return {Pagination}
     */
    public pagination(pagination: PaginationI | Pagination = {
        page: 1,
        countPerPage: 10,
    }): Pagination {
        if (Number(this.req.query.page)) {
            pagination.page = Number(this.req.query.page)
        }
        if (Number(this.req.query.count)) {
            pagination.countPerPage = Number(this.req.query.count)
        }

        return pagination as Pagination
    }

    /**
     * Convert a value to list of values
     * @param {any|any[]} value
     * @return {any[]}
     */
    public toArray = <T>(value: T | T[]): T[] => {
        if (Array.isArray(value)) return value
        return [value]
    }
}