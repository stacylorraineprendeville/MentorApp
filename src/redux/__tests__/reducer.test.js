import * as reducer from '../reducer'
import * as action from '../actions'

describe('environment reducer', () => {
  it('should handle SET_ENV', () => {
    expect(
      reducer.env('development', {
        type: action.SET_ENV,
        env: 'production'
      })
    ).toEqual('production')
  })
})

describe('login reducer', () => {
  it('should handle SET_TOKEN_SUCCESS', () => {
    expect(
      reducer.token(
        { token: '', status: '' },
        {
          type: action.SET_TOKEN_SUCCESS,
          token: 'token'
        }
      )
    ).toEqual({ token: 'token', status: 'success' })
  })

  it('should handle SET_TOKEN_ERROR', () => {
    expect(
      reducer.token(
        { token: '', status: '' },
        {
          type: action.SET_TOKEN_ERROR,
          env: 'production'
        }
      )
    ).toEqual({ token: '', status: 'error' })
  })
})

describe('surveys reducer', () => {
  const payload = [
    { surveyId: 1, surveyContent: 'content' },
    { surveyId: 2, surveyContent: 'content-2' }
  ]
  it('should handle LOAD_SURVEYS', () => {
    expect(
      reducer.surveys([], {
        type: action.LOAD_SURVEYS,
        payload
      })
    ).toEqual(payload)
    expect(
      reducer.surveys([], {
        type: action.LOAD_SURVEYS
      })
    ).toEqual([])
  })
})

describe('families reducer', () => {
  const payload = [
    { familyId: 1, familyContent: 'content' },
    { familyId: 2, familyContent: 'content-2' }
  ]
  it('should handle LOAD_FAMILIES', () => {
    expect(
      reducer.families([], {
        type: action.LOAD_FAMILIES,
        payload
      })
    ).toEqual(payload)
    expect(
      reducer.surveys([], {
        type: action.LOAD_FAMILIES
      })
    ).toEqual([])
  })
})

describe('snapshots reducer', () => {
  const payload = [
    { snapshotId: 1, snapshotContent: 'content' },
    { snapshotId: 2, snapshotContent: 'content-2' }
  ]
  it('should handle LOAD_SNAPSHOTS', () => {
    expect(
      reducer.snapshots([], {
        type: action.LOAD_SNAPSHOTS,
        payload
      })
    ).toEqual(payload)
    expect(
      reducer.surveys([], {
        type: action.LOAD_SNAPSHOTS
      })
    ).toEqual([])
  })
})

describe('drafts reducer', () => {
  const initialStore = [
    {
      draft_id: 1,
      status: 'Success'
    },
    {
      draft_id: 2,
      status: 'In progress'
    }
  ]
  it('should handle CREATE_DRAFT', () => {
    const payload = {
      draft_id: 3
    }
    expect(
      reducer.drafts(initialStore, {
        type: action.CREATE_DRAFT,
        payload
      })
    ).toEqual([...initialStore, { ...payload, status: 'In progress' }])
  })
  it('should handle SUBMIT_DRAFT_COMMIT', () => {
    const expectedStore = [
      {
        draft_id: 1,
        status: 'Success'
      },
      {
        draft_id: 2,
        status: 'Success'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.SUBMIT_DRAFT_COMMIT,
        meta: { id: 2 }
      })
    ).toEqual(expectedStore)
  })
  it('should handle SUBMIT_DRAFT_ROLLBACK', () => {
    const expectedStore = [
      {
        draft_id: 1,
        status: 'Success'
      },
      {
        draft_id: 2,
        status: 'Error'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.SUBMIT_DRAFT_ROLLBACK,
        meta: { id: 2 }
      })
    ).toEqual(expectedStore)
  })
  it('should handle ADD_SURVEY_DATA', () => {
    const expectedStore = [
      {
        draft_id: 1,
        status: 'Success'
      },
      {
        draft_id: 2,
        personal_survey_data: { name: 'Name' },
        status: 'In progress'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.ADD_SURVEY_DATA,
        id: 2,
        category: 'personal_survey_data',
        payload: { name: 'Name' }
      })
    ).toEqual(expectedStore)
  })
  it('should handle DELETE_DRAFT', () => {
    const expectedStore = [
      {
        draft_id: 1,
        status: 'Success'
      }
    ]
    expect(
      reducer.drafts(initialStore, {
        type: action.DELETE_DRAFT,
        id: 2
      })
    ).toEqual(expectedStore)
  })
})
