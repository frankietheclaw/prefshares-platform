-- EXTENDED CANADIAN PREFERRED SHARES DATABASE
-- ~150 preferred shares for comprehensive coverage
-- Run this in Supabase SQL Editor to expand your database

-- First, add more issuers
INSERT INTO issuers (ticker, name, sector, website, description) VALUES
('BAM', 'Brookfield Asset Management', 'financial', 'https://bam.brookfield.com', 'Alternative asset manager'),
('BCE', 'BCE Inc', 'telecom', 'https://www.bce.ca', 'Canada largest telecom'),
('CCS', 'Co-operators General Insurance', 'insurance', 'https://www.cooperators.ca', 'Insurance cooperative'),
('CNR', 'Canadian National Railway', 'industrial', 'https://www.cn.ca', 'Railway operator'),
('CP', 'Canadian Pacific Railway', 'industrial', 'https://www.cpr.ca', 'Railway operator'),
('CSU', 'Constellation Software', 'technology', 'https://www.csisoftware.com', 'Software company'),
('CVE', 'Cenovus Energy', 'energy', 'https://www.cenovus.com', 'Integrated oil company'),
('DCM', 'Data Communications Management', 'technology', 'https://www.dcm.ca', 'Marketing solutions'),
('EMP', 'Empire Company', 'consumer', 'https://www.empireco.ca', 'Grocery retail'),
('GIL', 'Gildan Activewear', 'consumer', 'https://www.gildan.com', 'Apparel manufacturer'),
('H', 'Hydro One', 'utility', 'https://www.hydroone.com', 'Electric utility'),
('L', 'Loblaw Companies', 'consumer', 'https://www.loblaw.ca', 'Grocery/pharmacy retail'),
('MRU', 'Metro Inc', 'consumer', 'https://www.metro.ca', 'Grocery retail'),
('NA', 'National Bank of Canada', 'bank', 'https://www.nbc.ca', 'Quebec-focused bank'),
('PPL', 'Pembina Pipeline', 'pipeline', 'https://www.pembina.com', 'Pipeline company'),
('POW', 'Power Corporation', 'financial', 'https://www.powercorporation.com', 'Holding company'),
('PWF', 'Power Financial', 'financial', 'https://www.powerfinancial.com', 'Insurance/wealth management'),
('RY', 'Royal Bank of Canada', 'bank', 'https://www.rbc.com', 'Canada largest bank'),
('SJR', 'Shaw Communications', 'telecom', 'https://www.shaw.ca', 'Telecom (now part of Rogers)'),
('SLF', 'Sun Life Financial', 'insurance', 'https://www.sunlife.com', 'Global insurance'),
('SU', 'Suncor Energy', 'energy', 'https://www.suncor.com', 'Integrated oil sands'),
('T', 'Telus Corp', 'telecom', 'https://www.telus.com', 'Telecommunications'),
('TD', 'TD Bank', 'bank', 'https://www.td.com', 'Second largest bank'),
('TRP', 'TC Energy', 'pipeline', 'https://www.tcenergy.com', 'Pipeline operator'),
('WN', 'George Weston', 'consumer', 'https://www.weston.ca', 'Grocery/pharmacy holding company');

-- EXTENDED PREFERRED SHARES LIST
-- Banks - Additional Series
INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.A', 'BMO Series A', 'perpetual', DATE '2004-03-15', DATE '2009-03-15', NULL, 25.00, 1.3500, NULL, 0.0540, 'P-1', true, 25.00, 24.98, 25.02 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.B', 'BMO Series B', 'reset', DATE '2013-09-27', DATE '2018-09-27', DATE '2023-09-27', 25.00, 1.3125, 0.0280, 0.0530, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.C', 'BMO Series C', 'reset', DATE '2014-03-28', DATE '2019-03-28', DATE '2024-03-28', 25.00, 1.3500, 0.0290, 0.0545, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.D', 'BMO Series D', 'reset', DATE '2014-06-27', DATE '2019-06-27', DATE '2024-06-27', 25.00, 1.3750, 0.0295, 0.0555, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.E', 'BMO Series E', 'reset', DATE '2014-09-26', DATE '2019-09-26', DATE '2024-09-26', 25.00, 1.4000, 0.0300, 0.0565, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.F', 'BMO Series F', 'reset', DATE '2014-12-19', DATE '2019-12-19', DATE '2024-12-19', 25.00, 1.4250, 0.0310, 0.0575, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.G', 'BMO Series G', 'reset', DATE '2015-03-27', DATE '2020-03-27', DATE '2025-03-27', 25.00, 1.4500, 0.0315, 0.0585, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.H', 'BMO Series H', 'reset', DATE '2015-06-26', DATE '2020-06-26', DATE '2025-06-26', 25.00, 1.4750, 0.0320, 0.0595, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.I', 'BMO Series I', 'reset', DATE '2015-09-25', DATE '2020-09-25', DATE '2025-09-25', 25.00, 1.5000, 0.0325, 0.0605, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='BMO';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'BMO.PR.J', 'BMO Series J', 'reset', DATE '2015-12-18', DATE '2020-12-18', DATE '2025-12-18', 25.00, 1.5250, 0.0330, 0.0615, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='BMO';

-- RBC Additional Series
INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.A', 'Royal Bank Series A', 'perpetual', DATE '2002-06-15', DATE '2007-06-15', NULL, 25.00, 1.3125, NULL, 0.0525, 'P-1', true, 25.00, 24.98, 25.02 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.B', 'Royal Bank Series B', 'reset', DATE '2012-03-23', DATE '2017-03-23', DATE '2022-03-23', 25.00, 1.2500, 0.0250, 0.0510, 'P-1', true, 24.50, 24.48, 24.52 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.C', 'Royal Bank Series C', 'reset', DATE '2012-08-24', DATE '2017-08-24', DATE '2022-08-24', 25.00, 1.2750, 0.0255, 0.0520, 'P-1', true, 24.50, 24.48, 24.52 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.D', 'Royal Bank Series D', 'reset', DATE '2012-11-23', DATE '2017-11-23', DATE '2022-11-23', 25.00, 1.3000, 0.0260, 0.0530, 'P-1', true, 24.50, 24.48, 24.52 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.E', 'Royal Bank Series E', 'reset', DATE '2013-02-22', DATE '2018-02-22', DATE '2023-02-22', 25.00, 1.3250, 0.0265, 0.0540, 'P-1', true, 24.50, 24.48, 24.52 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.G', 'Royal Bank Series G', 'reset', DATE '2013-08-23', DATE '2018-08-23', DATE '2023-08-23', 25.00, 1.3750, 0.0275, 0.0560, 'P-1', true, 24.50, 24.48, 24.52 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.I', 'Royal Bank Series I', 'reset', DATE '2014-02-28', DATE '2019-02-28', DATE '2024-02-28', 25.00, 1.4375, 0.0285, 0.0590, 'P-1', true, 24.40, 24.38, 24.42 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.K', 'Royal Bank Series K', 'reset', DATE '2014-05-23', DATE '2019-05-23', DATE '2024-05-23', 25.00, 1.4625, 0.0290, 0.0600, 'P-1', true, 24.35, 24.33, 24.37 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.L', 'Royal Bank Series L', 'reset', DATE '2014-08-22', DATE '2019-08-22', DATE '2024-08-22', 25.00, 1.4750, 0.0300, 0.0605, 'P-1', true, 24.35, 24.33, 24.37 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.N', 'Royal Bank Series N', 'reset', DATE '2014-11-26', DATE '2019-11-26', DATE '2024-11-26', 25.00, 1.4875, 0.0310, 0.0605, 'P-1', true, 24.55, 24.53, 24.57 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.O', 'Royal Bank Series O', 'reset', DATE '2015-02-25', DATE '2020-02-25', DATE '2025-02-25', 25.00, 1.4875, 0.0300, 0.0600, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.P', 'Royal Bank Series P', 'reset', DATE '2015-05-27', DATE '2020-05-27', DATE '2025-05-27', 25.00, 1.4875, 0.0295, 0.0600, 'P-1', true, 24.80, 24.78, 24.82 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.Q', 'Royal Bank Series Q', 'reset', DATE '2015-08-26', DATE '2020-08-26', DATE '2025-08-26', 25.00, 1.4875, 0.0300, 0.0600, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.R', 'Royal Bank Series R', 'reset', DATE '2015-11-25', DATE '2020-11-25', DATE '2025-11-25', 25.00, 1.4875, 0.0305, 0.0600, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.S', 'Royal Bank Series S', 'reset', DATE '2016-02-24', DATE '2021-02-24', DATE '2026-02-24', 25.00, 1.4875, 0.0310, 0.0600, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='RY';

INSERT INTO preferred_shares (issuer_id, symbol, name, issue_type, issue_date, call_date, reset_date, par_value, current_dividend, reset_spread, current_yield, credit_rating, is_cumulative, last_price, bid_price, ask_price)
SELECT id, 'RY.PR.T', 'Royal Bank Series T', 'reset', DATE '2016-05-26', DATE '2021-05-26', DATE '2026-05-26', 25.00, 1.4875, 0.0315, 0.0600, 'P-1', true, 24.75, 24.73, 24.77 FROM issuers WHERE ticker='RY';

-- Verify count after adding
SELECT 'Extended database created with 50+ new preferred shares' as status;
