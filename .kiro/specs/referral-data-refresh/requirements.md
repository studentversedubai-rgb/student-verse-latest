# Requirements Document

## Introduction

The referral system in the BentoDashboard currently displays stale referral data that only updates when users log out and log back in. This creates a poor user experience where users cannot see their referral progress in real-time. This feature will implement automatic refresh of referral data every 5 seconds to provide users with up-to-date information about their referral count and progress.

## Glossary

- **BentoDashboard**: The main dashboard component that displays user queue position, referral stats, and pro membership progress
- **ReferralStats**: Data structure containing referral code, count, and referred users list
- **AuthContext**: React context that manages user authentication state and data
- **BackendAPI**: Service that communicates with the backend server for user data
- **RefreshInterval**: The time period (5 seconds) between automatic data refresh attempts

## Requirements

### Requirement 1: Automatic Referral Data Refresh

**User Story:** As a user viewing the BentoDashboard, I want my referral data to refresh automatically every 5 seconds, so that I can see my referral progress update in real-time without having to log out and log back in.

#### Acceptance Criteria

1. WHEN a user is viewing the BentoDashboard, THE System SHALL automatically fetch updated referral data from the backend every 5 seconds
2. WHEN updated referral data is received, THE System SHALL update the displayed referral count and progress indicators immediately
3. WHEN the referral count increases, THE System SHALL update the Pro membership progress bar and chip slots to reflect the new count
4. WHEN a data refresh fails, THE System SHALL continue attempting to refresh on the next interval without disrupting the user experience
5. WHEN a user navigates away from the dashboard, THE System SHALL stop the automatic refresh to prevent unnecessary API calls

### Requirement 2: Backend API Enhancement

**User Story:** As a system, I want to provide an endpoint to fetch current user data, so that the frontend can retrieve updated referral information.

#### Acceptance Criteria

1. WHEN the frontend requests current user data with a valid email, THE Backend SHALL return the latest user data including referral count and waitlist position
2. WHEN an invalid email is provided, THE Backend SHALL return an appropriate error response
3. WHEN the backend processes a user data request, THE System SHALL return data in the same format as the OTP verification response
4. WHEN multiple refresh requests are made simultaneously, THE Backend SHALL handle them efficiently without data corruption

### Requirement 3: Error Handling and Resilience

**User Story:** As a user, I want the dashboard to remain functional even when data refresh fails, so that I can continue using the application without interruption.

#### Acceptance Criteria

1. WHEN a network error occurs during data refresh, THE System SHALL display the last known valid data and continue refresh attempts
2. WHEN the backend returns an error response, THE System SHALL log the error and maintain the current display state
3. WHEN multiple consecutive refresh attempts fail, THE System SHALL continue attempting without exponential backoff to ensure data freshness
4. WHEN the user's session becomes invalid, THE System SHALL handle authentication errors gracefully and redirect to login if necessary

### Requirement 4: Performance Optimization

**User Story:** As a user, I want the automatic refresh to be efficient and not impact the dashboard's performance, so that the interface remains responsive.

#### Acceptance Criteria

1. WHEN the dashboard component unmounts, THE System SHALL clean up the refresh interval to prevent memory leaks
2. WHEN multiple dashboard instances exist, THE System SHALL ensure only one refresh interval is active per user session
3. WHEN the browser tab becomes inactive, THE System SHALL continue refreshing data to maintain accuracy when the user returns
4. WHEN the refresh interval is active, THE System SHALL not interfere with user interactions or animations on the dashboard

### Requirement 5: Visual Feedback for Updates

**User Story:** As a user, I want to see subtle visual feedback when my referral data updates, so that I know the system is working and my progress is being tracked.

#### Acceptance Criteria

1. WHEN referral data is successfully refreshed, THE System SHALL provide subtle visual feedback without disrupting the user experience
2. WHEN the referral count increases, THE System SHALL animate the progress indicators to highlight the change
3. WHEN data is being refreshed, THE System SHALL not display loading states that would distract from the dashboard content
4. WHEN refresh fails silently, THE System SHALL not display error messages that would alarm the user unnecessarily
